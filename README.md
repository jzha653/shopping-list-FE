# shopping-app
## Available at:
http://shopping-list-bucket-bananadoge.s3-website-ap-southeast-2.amazonaws.com
![Screen Shot 2021-06-29 at 8 25 47 PM](https://user-images.githubusercontent.com/40383416/123763743-349bcb80-d918-11eb-891a-26611524f94c.png)

## Update on 30th Jun: CORS solved
 Removed FE access control request headers( blocked by browser) and added response headers in AWS Gateway. The main reason is the AWS Gateway ignores CORS headers from Lambda function
![Screen Shot 2021-06-30 at 10 03 49 PM](https://user-images.githubusercontent.com/40383416/123942244-105eee00-d9ef-11eb-9a0b-4aeb078462e2.png)


## Local setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Deploy to S3 bucket
```
npm run deploy
```

