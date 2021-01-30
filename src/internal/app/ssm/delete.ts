import AWS = require('aws-sdk')

export enum SsmParameterType {
  plain = 'String',
  secure = 'SecureString'
}

export const deleteSsmParamter = async (key: string): Promise<AWS.SSM.Types.DeleteParameterResult> => {
  const ssm = new AWS.SSM()

  const result = await ssm.deleteParameter().promise()

  return result
}
