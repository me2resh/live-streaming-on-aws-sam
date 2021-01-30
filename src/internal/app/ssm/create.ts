import AWS = require('aws-sdk')

export enum SsmParameterType {
  plain = 'String',
  secure = 'SecureString'
}

export const createSsmParamter = async (key: string, value: string, type: SsmParameterType): Promise<AWS.SSM.Types.PutParameterResult> => {
  const ssm = new AWS.SSM()

  const params = {
    Name: key,
    Value: value,
    Type: type
  }

  const newParameter = await ssm.putParameter(params).promise()

  return newParameter
}
