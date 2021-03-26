import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { CfnOutput } from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs';
import { Runtime } from "@aws-cdk/aws-lambda";
import * as path from "path";

export class SimpleAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new Bucket(this, 'ClaudioCdkBucketTest', {
      encryption: BucketEncryption.S3_MANAGED,
    });
    
    const getPhotos = new lambda.NodejsFunction(this, 'MySimpleAppLambda', {
      runtime: Runtime.NODEJS_12_X,
      entry: path.join(__dirname, '..', 'api', 'get-photos', 'index.ts'),
      handler: 'getPhotos',
    });

    new CfnOutput(this, 'ClaudioCdkBucketTestExport', {
      value: bucket.bucketName,
      description: 'a random description for our bucket',
      exportName: 'ClaudioCdkBucketTestName',
    });
  }
}
