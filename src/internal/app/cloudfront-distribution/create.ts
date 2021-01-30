import AWS = require('aws-sdk')

export const createCloudfrontDistribution = async (channelName: string, domainName = ''): Promise<AWS.CloudFront.Types.CreateDistributionResult> => {
  const cloudfront = new AWS.CloudFront({ apiVersion: '2017-10-14' })

  const params: AWS.CloudFront.Types.CreateDistributionRequest = {
    DistributionConfig: {
      Origins: {
        Quantity: 1,
        Items: [
          {
            Id: channelName + 'MediapackageCF',
            DomainName: domainName,
            // CustomHeaders: {
            //     Quantity: 1,
            //     Items: [{
            //         HeaderName: 'X-MediaPackage-CDNIdentifier',
            //         HeaderValue: 'UUID',
            //     }]
            // },
            CustomOriginConfig:
                            {
                              HTTPPort: 80,
                              HTTPSPort: 443,
                              OriginProtocolPolicy: 'https-only'
                            }
          }]
      },
      DefaultCacheBehavior: {
        TrustedSigners: {
          Quantity: 1,
          Enabled: true
        },
        MinTTL: 0,
        TargetOriginId: '',
        SmoothStreaming: true,
        AllowedMethods: {
          Quantity: 3,
          Items: [
            'GET', 'HEAD', 'OPTIONS'
          ],
          CachedMethods: {
            Quantity: 3,
            Items: [
              'GET', 'HEAD', 'OPTIONS'
            ]
          }
        },
        ForwardedValues: {
          QueryString: true,
          Cookies: {
            Forward: 'all'
          }
        },
        ViewerProtocolPolicy: 'allow-all'
      },
      Enabled: true,
      ViewerCertificate: {
        CloudFrontDefaultCertificate: true
      },
      CallerReference: '',
      Comment: ''
    }
  }

  const cfDistr = await cloudfront.createDistribution(params).promise()

  return cfDistr
}
