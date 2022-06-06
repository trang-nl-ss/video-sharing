# video-sharing

## Deployment

### Prerequirement

1. Install docker [Guide](https://docs.docker.com/engine/install/ubuntu/)
2. Install docker-compose [Guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04)

### Build project

        sudo docker-compose build

### Run project

        sudo docker-compose up

### Access

- Access [http://localhost](http://localhost) and enjoy

## Required Features:

- Register: You can register with any valid email
- Login: Please test with email: trang.nguyen@gmail.com / 123
    case 1: right password, you can login
    case 2: wrong password, toast appear
-  Share movie: please click "Share a movie" button or navigate .../share
    before calling the /share-video api, an external api is called to get the video's information like title, description
- See movie list: both egistered user and visitor can access home page
