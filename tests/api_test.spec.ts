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
            userId: 2,
        },
    });

    expect(postResponse.status()).toBe(201);
    const postResponseBody = await postResponse.json();
    expect(postResponseBody.id).toBeTruthy();
    expect(postResponseBody.userId).toBe(2);
    expect(postResponseBody.body).toBe('API Things');
});

test('Verify PUT request updates entire post and returns 200', async ({ request }) => {
    const putResponse = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            id: 1,
            userId: 1,
            title: 'Completely Updated Title',
            body: 'Completely Updated Body',
        },
    });

    expect(putResponse.status()).toBe(200);

    const putResponseBody = await putResponse.json();
    expect(putResponseBody.id).toBe(1);
    expect(putResponseBody.title).toBe('Completely Updated Title');
    expect(putResponseBody.body).toBe('Completely Updated Body');

});


test('Verify PATCH request partially updates post and returns 200', async ({ request }) => {
    const patchResponse = await request.patch('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
            title: 'Only PATCH Update',
        },
    });

    expect(patchResponse.status()).toBe(200);
    const patchResponseBody = await patchResponse.json();

    expect(patchResponseBody.title).toBe('Only PATCH Update');
    expect(patchResponseBody.body).toBeTruthy();
});


test('Verify DELETE request is success and returns 200', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);
});

test('Verify GET non-existent user returns 404 Not Found', async ({ request }) => {
    // 1. Request a user ID that does not exist on the server (/users/9999)
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999');

    // 2. Assert that the server properly rejects it with 404

    console.log('Status:', response.status());
    expect(response.status()).toBe(404);
});

test('Verify API Request with Authorization Beared header', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1', {
        headers: {
            'Authorization': 'Bearer test-token-123',
            'Accept': 'application/json',
        },
    });

});


