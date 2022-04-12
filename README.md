The `cdk.json` file tells the CDK Toolkit how to execute your app.
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


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