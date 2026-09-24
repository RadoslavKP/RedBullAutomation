import { test, expect } from '@playwright/test';


test('api/devices/command Endpoint Validation with Online Device', async ({ request }) => {
  const authResponse = await request.post('https://qa-sample-radoslav-petrov.up.railway.app/api/auth/signin', {
    data: {
      email: "admin@example.com",
      password: "Admin1234",
    },
  });
  expect(authResponse.status()).toBe(200);
  const authBody = await authResponse.json();
  const token = authBody.token;
  const commandResponse = await request.post('https://qa-sample-radoslav-petrov.up.railway.app/api/devices/command', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      devices: ['79101X02X002023000B3J2000'],
      command_name: 'update_core_services',
      params: {
        command_version: '6.4.10',
      },
    },
  });

  expect(commandResponse.status()).toBe(200);
  const responseBody = await commandResponse.json();
  expect(responseBody).toBeTruthy();
  console.log(responseBody);
});