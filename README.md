This is one implementation of the AWS Blog: 
https://aws.amazon.com/blogs/opensource/creating-a-custom-lambda-authorizer-using-open-policy-agent/

This is in no way production level code, just a scratchpad.

```
make deps
make clean
make opabuild

// optional
cdk synth 
cdk deploy

// after deploy, cdk will output a public url for you to use, for ease I set it to an env variable

HELLOAPI=https://12345abcde.execute-api.us-east-1.amazonaws.com/prod/hello 
curl --location --request GET $HELLOAPI --header 'usergroup: ViewerGroup' --header 'resource: record1'
curl --location --request GET $HELLOAPI --header 'usergroup: ViewerGroup' --header 'resource: record_secret'
curl --location --request GET $HELLOAPI --header 'usergroup: AdminGroup' --header 'resource: record_secret'
```

curl --location --request GET $HELLOAPI --header 'usergroup: ViewerGroup' --header 'resource: record1'
> {"message": "Hello, You are authorized using Open Policy Agent Lambda Authorizer"}


curl --location --request GET $HELLOAPI --header 'usergroup: ViewerGroup' --header 'resource: record_secret'
> {"message":"Unauthorized"}

curl --location --request GET $HELLOAPI --header 'usergroup: AdminGroup' --header 'resource: record_secret'
> {"message": "Hello, You are authorized using Open Policy Agent Lambda Authorizer"}
