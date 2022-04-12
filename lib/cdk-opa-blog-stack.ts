import { App, Stack, StackProps, Duration, CfnOutput } from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkOpaBlogStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const api = new apigateway.RestApi(this, "HelloApi", {
      restApiName: "HelloApi",
      description: "Hello World API",
    });

    const opaCustomAuthLambda = new lambda.Function(this, "OpaAuthorizer", {
      runtime: lambda.Runtime.GO_1_X,
      code: lambda.AssetCode.fromAsset("opaCustomGoAuthorizer"),
      handler: "main",
      functionName: "OpaCustomGoAuthorizer",
    });

    const customOpaAuthorizer = new apigateway.RequestAuthorizer(
      this,
      "customOpaAuthorizer",
      {
        handler: opaCustomAuthLambda,
        resultsCacheTtl: Duration.minutes(0),
        authorizerName: "CustomOpaLambdaAuthorizer",
        identitySources: [
          apigateway.IdentitySource.header("Usergroup"),
          apigateway.IdentitySource.header("Resource"),
        ],
      }
    );

    const hello = api.root.addResource("hello");
    const hello_handler = new lambda.Function(this, "hello", {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.AssetCode.fromAsset("helloworld_function"),
      handler: "app.lambda_handler",
      functionName: "HelloWorldLambdaFunction",
    });

    const helloGetIntegration = new apigateway.LambdaIntegration(hello_handler);
    hello.addMethod("GET", helloGetIntegration, {
      authorizer: customOpaAuthorizer,
    });

    new CfnOutput(this, "Hello API URL:", {
      value: api.url + "hello" ?? "Something went wrong with the deploy",
    });
  }
}
