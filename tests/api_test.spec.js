import { test, expect } from '@playwright/test';
test('Verify GET request returns 200 and valid data', async ({ request }) => {
    const getResponse = await request.get('https://jsonplaceholder.typicode.com/users/1');
    expect(getResponse.status()).toBe(200);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody.id).toBe(1);
    expect(getResponseBody.username).toBe('Bret');
});
test('Verify POST request returns 201 and created', async ({ request }) => {
    const postResponse = await request.post('https://jsonplaceholder.typicode.com/posts', {
        data: {
            title: 'Playwright API Practice',
            body: 'API Things',
            id: 2,
        },
    });
    expect(postResponse.status()).toBe(201);
    const postResponseBody = await postResponse.json();
    expect(postResponseBody.id).toBe(101);
    expect(postResponseBody.body).toBe('API Things');
});
