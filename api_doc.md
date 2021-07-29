# Yo Doc Health App Server
My Yo Doc Health App is an application to manage your Yo Doc Health App. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /Doctors

> Get all Doctors

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "name": "dr. Arief Fadillah, Sp.PD",
    "email": "arief@doctor.com",
    "password": "123456",
    "price": 250000,
    "imgUrl": "https://www.halodoc.com/assets/svg/thumb_doctor.svg",
    "age": 35,
    "year": 5,
    "SpecialistId": 1,
    "HospitalId": 1,
    "createdAt": "2021-07-28T02:58:57.229Z",
    "updatedAt": "2021-07-28T02:58:57.229Z",
    "Hospital": {
      "id": 1,
      "name": "RS Royal Taruma",
      "location": "Jalan Daan Mogot, Tanjung Duren Utara, Jakarta Barat",
      "imgUrl": "https://assets.indozone.news/local/5dd3706581fc9.jpg",
      "createdAt": "2021-07-28T02:45:58.112Z",
      "updatedAt": "2021-07-28T02:45:58.112Z"
    },
    "Specialist": {
      "id": 1,
      "name": "Spesialis Anak",
      "createdAt": "2021-07-28T02:45:58.123Z",
      "updatedAt": "2021-07-28T02:45:58.123Z"
    }
  },
  {
    "id": 2,
    "name": "dr. Yenny Halim, Sp.A",
    "email": "yenny@doctor.com",
    "password": "123456",
    "price": 150000,
    "imgUrl": "https://d1ojs48v3n42tp.cloudfront.net/personnels/463640_21-5-2021_11-3-1.png",
    "age": 40,
    "year": 10,
    "SpecialistId": 2,
    "HospitalId": 2,
    "createdAt": "2021-07-28T02:58:57.229Z",
    "updatedAt": "2021-07-28T02:58:57.229Z",
    "Hospital": {
      "id": 2,
      "name": "Siloam Hospitals",
      "location": "Kebon Jeruk, Jakarta Barat",
      "imgUrl": "https://assets.indozone.news/local/5dd36febb4db6.jpg",
      "createdAt": "2021-07-28T02:45:58.112Z",
      "updatedAt": "2021-07-28T02:45:58.112Z"
    },
    "Specialist": {
      "id": 2,
      "name": "Spesialis Penyakit Dalam",
      "createdAt": "2021-07-28T02:45:58.123Z",
      "updatedAt": "2021-07-28T02:45:58.123Z"
    }
  }
]
```
---
### POST /register

> REGISTER user 

_Request Header_
```
{
  Not Needed
}
```

_Request Body_
```
{
  "firstName": "<name to get insert into>",
  "lastName": "<name to get insert into>",
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "phoneNumber": "<phoneNumber to get insert into>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": <posted email>,
  "token": <from jwt>,
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /login

> LOGIN user 

_Request Header_
```
{
  Not Needed
}
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
```

_Response (201 - Created)_
```
{
  "email": "<posted email>",
  "name": "<given from data>",
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInVzZXJuYW1lIjoiZGFuYXNNIiwiZW1haWwiOiJkYW5hc01AaGFja3RpdjguY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI1NjIzNjg2LCJleHAiOjE2MjU2MjcyODZ9.o15tHBiN24bgyKjwGnkQIkiT_JDCKM-r2odUxL4I2FY"
}
```

_Response (404 - Not Found)_
```
{
  "message": "User doesn't exists"
}
```

_Response (401 - Not Found)_
```
{
  "message": "Invalid Account"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---