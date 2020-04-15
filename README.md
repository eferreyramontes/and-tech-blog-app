# and-tech-blog-app
AND Digital Tech Blog Backend

## Steps to reproduce it 

1. Create the app bsaded on a template

```bash
serverless create --template aws-nodejs --path and-tech-blog-app
```

2. Configure serverless, if you haven't done it yet

```bash
serverless config credentials -o --provider aws --key <YOUR_KEY> --secret <YOUR_SECRET>
```