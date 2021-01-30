import AWS = require('aws-sdk')

export const newMediaPackageEndpoint = async (channelName: string) => {
  const endPointName = channelName + 'Endpoint'

  const mediaPackage = new AWS.MediaPackage()
  const endpointParams = {
    Id: endPointName,
    ChannelId: channelName,
    Description: '',
    StartoverWindowSeconds: 0,
    TimeDelaySeconds: 0,
    ManifestName: 'index',
    Whitelist: [],
    HlsPackage: {
      SegmentDurationSeconds: 6,
      PlaylistWindowSeconds: 60,
      PlaylistType: 'EVENT',
      AdMarkers: 'NONE',
      AdTriggers: [
        'SPLICE_INSERT',
        'PROVIDER_ADVERTISEMENT',
        'DISTRIBUTOR_ADVERTISEMENT',
        'PROVIDER_PLACEMENT_OPPORTUNITY',
        'DISTRIBUTOR_PLACEMENT_OPPORTUNITY'
      ],
      AdsOnDeliveryRestrictions: 'RESTRICTED',
      ProgramDateTimeIntervalSeconds: 0,
      IncludeIframeOnlyStream: false,
      UseAudioRenditionGroup: false,
      StreamSelection: {
        StreamOrder: 'ORIGINAL'
      }
    },
    Origination: 'ALLOW'
  }

  const endpoint = await mediaPackage.createOriginEndpoint(endpointParams, function (err: Error, data: any) {
    if (err != null) console.log(err, err.stack)
    else return data
  }).promise()

  return endpoint
}
