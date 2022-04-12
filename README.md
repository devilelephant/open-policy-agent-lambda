This is one implementation of the AWS Blog: 
https://aws.amazon.com/blogs/opensource/creating-a-custom-lambda-authorizer-using-open-policy-agent/

This is in no way production level code, just a scratchpad.

// AFTER cdk deploy copy
HELLOAPI=https://7063zredxj.execute-api.us-east-1.amazonaws.com/prod/hello // whatever the url is
curl --location --request GET $HELLOAPI --header 'usergroup: ViewerGroup' --header 'resource: record1'
curl --location --request GET $HELLOAPI --header 'usergroup: ViewerGroup' --header 'resource: record_secret'
curl --location --request GET $HELLOAPI --header 'usergroup: AdminGroup' --header 'resource: record_secret'


curl --location --request GET $HELLOAPI --header 'usergroup: ViewerGroup' --header 'resource: record1'
> {"message": "Hello, You are authorized using Open Policy Agent Lambda Authorizer"}


curl --location --request GET $HELLOAPI --header 'usergroup: ViewerGroup' --header 'resource: record_secret'
> {"message":"Unauthorized"}

curl --location --request GET $HELLOAPI --header 'usergroup: AdminGroup' --header 'resource: record_secret'
> {"message": "Hello, You are authorized using Open Policy Agent Lambda Authorizer"}