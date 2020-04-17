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

3. Then you can deploy your stack as many times as you want with:

```bash
serverless deploy
```

4. And destroy the stack with:

```bash
serverless remove -v
```