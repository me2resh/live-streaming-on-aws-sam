import AWS = require('aws-sdk')

export const deleteMediaLiveInput = async (inputId: any): Promise<AWS.MediaLive.Types.DeleteInputResponse> => {
  const medialive = new AWS.MediaLive({ apiVersion: '2017-10-14' })

  const params: AWS.MediaLive.Types.DeleteInputRequest = { InputId: inputId }
  const result = await medialive.deleteInput(params).promise()

  return result
}
