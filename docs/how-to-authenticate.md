# How to Authenticate and Login to the API

### Step 1: Login
Use this [link](https://metanoia.auth.ap-southeast-1.amazoncognito.com/login?client_id=2sc9m89svtrpcsbkd6lirb85e5&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://www.example.com) to sign up or login to your Metanoia account.

### Step 2: You will be redirected after successful login

The url of the page you will be redirected to will look as follows:

```
https://www.example.com/#

id_token=eyJraWQiOiJ1QUhReklFNlwvcDdmcXMwOHU4emxpQzZHSFhKaWdqSUlyT1RtYmhsQWFqTT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiTlphQzY4ZkZtNm5FLXQ4VVBpRVhQdyIsInN1YiI6ImZkMmE3MjExLTY3YWItNDc5My04MjAzLTExODg2YjNmNDdlNiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1c2M0V2REM4MyIsImNvZ25pdG86dXNlcm5hbWUiOiJib2Iuc21pdGgiLCJnaXZlbl9uYW1lIjoiQm9iIiwiYXVkIjoiMnNjOW04OXN2dHJwY3Nia2Q2bGlyYjg1ZTUiLCJldmVudF9pZCI6ImNkYzU4YjdmLTIxM2UtNDgyNi05MTk0LTdiNDc4OGZjMDU0MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjY3MzA5MzY1LCJleHAiOjE2NjczMTI5NjUsImlhdCI6MTY2NzMwOTM2NSwiZmFtaWx5X25hbWUiOiJTbWl0aCIsImp0aSI6ImVlNzk5MDg5LWYwNWEtNGU3Zi05ODE2LWVhNmY2NWZlYWZhZiIsImVtYWlsIjoiYm9iLnNtaXRoQG1ldGFub2lhLmNvbSJ9.helP2hEDZABrEHfIZI_dNp4ym2jCBdIKlYp7Kk_PbrM5xvcpOcVg7Fhu5U11UgeF1jPOpnPlcAICU8FwBJFf-9tyMCn2bqZDkyGITC1Ewb8IkPrTwEBtFM0JGKET1Lg8mvAY0Dz7pgR2txOQn5BoyrQ2t4sf5dMswmE84HKleRhpRPv0ovoqKEbReGhfvYsGZtaJ09SMXwPWpZCrjXaUTW5_uN0_MN50mMmGLiZlveHHbBpMBvJQlxp114SOm3qIgaabgLO8sX-AUH1zyZUUUOl_h-dPKw9SSJ3QK3Ry5kY1JvLj-gC9IH7D-ob1N5NyHTYuUyNUtQs4enyX0gHrkQ

&access_token=eyJraWQiOiJ5YVFkVysrQ3BDaXRJSDFZRXBqOVUybEhMVDJWc0oyRUFRc0xKTVpQQktzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmZDJhNzIxMS02N2FiLTQ3OTMtODIwMy0xMTg4NmIzZjQ3ZTYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfVzYzRXZEQzgzIiwidmVyc2lvbiI6MiwiY2xpZW50X2lkIjoiMnNjOW04OXN2dHJwY3Nia2Q2bGlyYjg1ZTUiLCJldmVudF9pZCI6ImNkYzU4YjdmLTIxM2UtNDgyNi05MTk0LTdiNDc4OGZjMDU0MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2NjczMDkzNjUsImV4cCI6MTY2NzMxMjk2NSwiaWF0IjoxNjY3MzA5MzY1LCJqdGkiOiI0NDcxNmM1OC05NDc5LTRiZjctOWQ5Yi0zZGNkNGM4MDg3YTIiLCJ1c2VybmFtZSI6ImJvYi5zbWl0aCJ9.Nr9Th0syS5zc9x-Y9DOcfyEOYxsSPd0bzgF8b9UTNXBMFuWhA27pRAgWRgfsWprzizqp2OuP8JLRhBuieNDPit0bloVGcfzXWfb-rKRjP3lpZS5nYSnB752muYhx88qRtklNpQ5KO2WmbDnREwcv_RTmGSOUwI9_ZGjLPJ62dEIVBAkdycOb5_9dIZRyZoAf-5-YLY6045rnnsJUILphBSMLVJONLy7ZAZ0Nfk-RrLb6yoPeinUIZ_Ve8uo47b_e0EC5BZj4fx2m_xRWCRrATaBNN-w_zG4-l9ILPTv4X46ijVqk004u2OjXsaA1gJ5VomUqHn1WCorzfAOHcAjylQ

&expires_in=3600

&token_type=Bearer
```

The **id_token** is a JWT that includes information about the user and allows the backend to authenticate and authorize the user when making requests. The token expires after a set time and needs to be refreshed. 


### Step 3: Call Endpoints


In order to call API endpoints that require authorization, you must take the **id_token** and include it in the headers of the request under the Authorization header.

In the example given above, this would look as follows:

`Authorization: Bearer eyJraWQiOiJ1QUhReklFNlwvcDdmcXMwOHU4emxpQzZHSFhKaWdqSUlyT1RtYmhsQWFqTT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiTlphQzY4ZkZtNm5FLXQ4VVBpRVhQdyIsInN1YiI6ImZkMmE3MjExLTY3YWItNDc5My04MjAzLTExODg2YjNmNDdlNiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1c2M0V2REM4MyIsImNvZ25pdG86dXNlcm5hbWUiOiJib2Iuc21pdGgiLCJnaXZlbl9uYW1lIjoiQm9iIiwiYXVkIjoiMnNjOW04OXN2dHJwY3Nia2Q2bGlyYjg1ZTUiLCJldmVudF9pZCI6ImNkYzU4YjdmLTIxM2UtNDgyNi05MTk0LTdiNDc4OGZjMDU0MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjY3MzA5MzY1LCJleHAiOjE2NjczMTI5NjUsImlhdCI6MTY2NzMwOTM2NSwiZmFtaWx5X25hbWUiOiJTbWl0aCIsImp0aSI6ImVlNzk5MDg5LWYwNWEtNGU3Zi05ODE2LWVhNmY2NWZlYWZhZiIsImVtYWlsIjoiYm9iLnNtaXRoQG1ldGFub2lhLmNvbSJ9.helP2hEDZABrEHfIZI_dNp4ym2jCBdIKlYp7Kk_PbrM5xvcpOcVg7Fhu5U11UgeF1jPOpnPlcAICU8FwBJFf-9tyMCn2bqZDkyGITC1Ewb8IkPrTwEBtFM0JGKET1Lg8mvAY0Dz7pgR2txOQn5BoyrQ2t4sf5dMswmE84HKleRhpRPv0ovoqKEbReGhfvYsGZtaJ09SMXwPWpZCrjXaUTW5_uN0_MN50mMmGLiZlveHHbBpMBvJQlxp114SOm3qIgaabgLO8sX-AUH1zyZUUUOl_h-dPKw9SSJ3QK3Ry5kY1JvLj-gC9IH7D-ob1N5NyHTYuUyNUtQs4enyX0gHrkQ`

The whole request using curl could look like this:

`curl --location --request GET 'https://73272wu9e1.execute-api.ap-southeast-1.amazonaws.com/user/files' \
--header 'Authorization: Bearer eyJraWQiOiJ1QUhReklFNlwvcDdmcXMwOHU4emxpQzZHSFhKaWdqSUlyT1RtYmhsQWFqTT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiTlphQzY4ZkZtNm5FLXQ4VVBpRVhQdyIsInN1YiI6ImZkMmE3MjExLTY3YWItNDc5My04MjAzLTExODg2YjNmNDdlNiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX1c2M0V2REM4MyIsImNvZ25pdG86dXNlcm5hbWUiOiJib2Iuc21pdGgiLCJnaXZlbl9uYW1lIjoiQm9iIiwiYXVkIjoiMnNjOW04OXN2dHJwY3Nia2Q2bGlyYjg1ZTUiLCJldmVudF9pZCI6ImNkYzU4YjdmLTIxM2UtNDgyNi05MTk0LTdiNDc4OGZjMDU0MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjY3MzA5MzY1LCJleHAiOjE2NjczMTI5NjUsImlhdCI6MTY2NzMwOTM2NSwiZmFtaWx5X25hbWUiOiJTbWl0aCIsImp0aSI6ImVlNzk5MDg5LWYwNWEtNGU3Zi05ODE2LWVhNmY2NWZlYWZhZiIsImVtYWlsIjoiYm9iLnNtaXRoQG1ldGFub2lhLmNvbSJ9.helP2hEDZABrEHfIZI_dNp4ym2jCBdIKlYp7Kk_PbrM5xvcpOcVg7Fhu5U11UgeF1jPOpnPlcAICU8FwBJFf-9tyMCn2bqZDkyGITC1Ewb8IkPrTwEBtFM0JGKET1Lg8mvAY0Dz7pgR2txOQn5BoyrQ2t4sf5dMswmE84HKleRhpRPv0ovoqKEbReGhfvYsGZtaJ09SMXwPWpZCrjXaUTW5_uN0_MN50mMmGLiZlveHHbBpMBvJQlxp114SOm3qIgaabgLO8sX-AUH1zyZUUUOl_h-dPKw9SSJ3QK3Ry5kY1JvLj-gC9IH7D-ob1N5NyHTYuUyNUtQs4enyX0gHrkQ'`