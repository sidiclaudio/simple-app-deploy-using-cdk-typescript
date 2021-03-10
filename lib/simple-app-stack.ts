import { Bucket, BucketEncryption } from '@aws-cdk/aws-s3';
import * as cdk from '@aws-cdk/core';
import { CfnOutput } from '@aws-cdk/core';

export class SimpleAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new Bucket(this, 'ClaudioCdkBucketTest', {
      encryption: BucketEncryption.S3_MANAGED,
    });

    new CfnOutput(this, 'ClaudioCdkBucketTestExport', {
      value: 'ClaudioCdkBucketTestExport',
      description: 'a random description',
      exportName: 'ClaudioCdkBucketTestExportName',
    });
  }
}
