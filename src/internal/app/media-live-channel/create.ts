import AWS = require('aws-sdk');

export const newMediaLiveChannel = async (
    channelName: string,
    input: AWS.MediaLive.Types.CreateInputResponse,
    destinationUrl: string,
    userName: string,
    passwordSsm: string
): Promise<AWS.MediaLive.Types.CreateChannelResponse> => {

    var medialive = new AWS.MediaLive({apiVersion: '2017-10-14'})

    const Name = channelName + 'LiveChannel'
    
    const mediaLiveChannelParams: AWS.MediaLive.Types.CreateChannelRequest = {
        Name: Name,
        // id: '9923914',
        // arn: 'arn:aws:medialive:eu-west-1:837082807967:channel:9923914',
        InputAttachments: [
            {
                InputId: input.Input?.Id,
                InputAttachmentName: input.Input?.Name + 'Attachment',
                InputSettings: {
                    SourceEndBehavior: 'CONTINUE',
                    InputFilter: 'AUTO',
                    FilterStrength: 1,
                    DeblockFilter: 'DISABLED',
                    DenoiseFilter: 'DISABLED',
                    Smpte2038DataPreference: 'IGNORE',
                    AudioSelectors: [],
                    CaptionSelectors: []
                }
            }
        ],
        // state: 'RUNNING',
        // pipelinesRunningCount: 1,
        Destinations: [
            {
                Id: Name + 'destination1',
                Settings: [
                    {
                        Url: destinationUrl,
                        Username: userName,
                        PasswordParam: passwordSsm
                    }
                ],
                MediaPackageSettings: []
            }
        ],
        // egressEndpoints: [
        //     {
        //         sourceIp: '18.203.44.154'
        //     }
        // ],
        EncoderSettings: {
            AudioDescriptions: [
                {
                    AudioSelectorName: 'default',
                    CodecSettings: {
                        AacSettings: {
                            Bitrate: 64000,
                            RawFormat: 'NONE',
                            Spec: 'MPEG4'
                        }
                    },
                    AudioTypeControl: 'FOLLOW_INPUT',
                    LanguageCodeControl: 'FOLLOW_INPUT',
                    Name: 'audio_1_aac64'
                },
                {
                    AudioSelectorName: 'default',
                    CodecSettings: {
                        AacSettings: {
                            Bitrate: 64000,
                            RawFormat: 'NONE',
                            Spec: 'MPEG4'
                        }
                    },
                    AudioTypeControl: 'FOLLOW_INPUT',
                    LanguageCodeControl: 'FOLLOW_INPUT',
                    Name: 'audio_2_aac64'
                },
                {
                    AudioSelectorName: 'default',
                    CodecSettings: {
                        AacSettings: {
                            Bitrate: 64000,
                            RawFormat: 'NONE',
                            Spec: 'MPEG4'
                        }
                    },
                    AudioTypeControl: 'FOLLOW_INPUT',
                    LanguageCodeControl: 'FOLLOW_INPUT',
                    Name: 'audio_3_aac64'
                },
                {
                    AudioSelectorName: 'default',
                    CodecSettings: {
                        AacSettings: {
                            Bitrate: 96000,
                            RawFormat: 'NONE',
                            Spec: 'MPEG4'
                        }
                    },
                    AudioTypeControl: 'FOLLOW_INPUT',
                    LanguageCodeControl: 'FOLLOW_INPUT',
                    Name: 'audio_1_aac96'
                },
                {
                    AudioSelectorName: 'default',
                    CodecSettings: {
                        AacSettings: {
                            Bitrate: 96000,
                            RawFormat: 'NONE',
                            Spec: 'MPEG4'
                        }
                    },
                    AudioTypeControl: 'FOLLOW_INPUT',
                    LanguageCodeControl: 'FOLLOW_INPUT',
                    Name: 'audio_2_aac96'
                },
                {
                    AudioSelectorName: 'default',
                    CodecSettings: {
                        AacSettings: {
                            Bitrate: 96000,
                            RawFormat: 'NONE',
                            Spec: 'MPEG4'
                        }
                    },
                    AudioTypeControl: 'FOLLOW_INPUT',
                    LanguageCodeControl: 'FOLLOW_INPUT',
                    Name: 'audio_3_aac96'
                },
                {
                    AudioSelectorName: 'default',
                    CodecSettings: {
                        AacSettings: {
                            Bitrate: 128000,
                            RawFormat: 'NONE',
                            Spec: 'MPEG4'
                        }
                    },
                    AudioTypeControl: 'FOLLOW_INPUT',
                    LanguageCodeControl: 'FOLLOW_INPUT',
                    Name: 'audio_1_aac128'
                },
                {
                    AudioSelectorName: 'default',
                    CodecSettings: {
                        AacSettings: {
                            Bitrate: 128000,
                            RawFormat: 'NONE',
                            Spec: 'MPEG4'
                        }
                    },
                    AudioTypeControl: 'FOLLOW_INPUT',
                    LanguageCodeControl: 'FOLLOW_INPUT',
                    Name: 'audio_2_aac128'
                },
                {
                    AudioSelectorName: 'default',
                    CodecSettings: {
                        AacSettings: {
                            Bitrate: 128000,
                            RawFormat: 'NONE',
                            Spec: 'MPEG4'
                        }
                    },
                    AudioTypeControl: 'FOLLOW_INPUT',
                    LanguageCodeControl: 'FOLLOW_INPUT',
                    Name: 'audio_3_aac128'
                }
            ],
            CaptionDescriptions: [],
            OutputGroups: [
                {
                    OutputGroupSettings: {
                        HlsGroupSettings: {
                            // IncompleteSegmentBehavior: 'AUTO',
                            // DiscontinuityTags: 'INSERT',
                            AdMarkers: [],
                            CaptionLanguageSetting: 'OMIT',
                            CaptionLanguageMappings: [],
                            HlsCdnSettings: {
                                HlsBasicPutSettings: {
                                    NumRetries: 5,
                                    ConnectionRetryInterval: 30,
                                    RestartDelay: 5,
                                    FilecacheDuration: 300
                                }
                            },
                            InputLossAction: 'EMIT_OUTPUT',
                            ManifestCompression: 'NONE',
                            Destination: {
                                DestinationRefId: Name + 'destination1'
                            },
                            IvInManifest: 'INCLUDE',
                            IvSource: 'FOLLOWS_SEGMENT_NUMBER',
                            ClientCache: 'ENABLED',
                            TsFileMode: 'SEGMENTED_FILES',
                            ManifestDurationFormat: 'FLOATING_POINT',
                            SegmentationMode: 'USE_SEGMENT_DURATION',
                            RedundantManifest: 'DISABLED',
                            OutputSelection: 'MANIFESTS_AND_SEGMENTS',
                            StreamInfResolution: 'INCLUDE',
                            IFrameOnlyPlaylists: 'DISABLED',
                            IndexNSegments: 10,
                            ProgramDateTime: 'INCLUDE',
                            ProgramDateTimePeriod: 600,
                            KeepSegments: 21,
                            SegmentLength: 6,
                            TimedMetadataId3Frame: 'PRIV',
                            TimedMetadataId3Period: 10,
                            HlsId3SegmentTagging: 'DISABLED',
                            CodecSpecification: 'RFC_4281',
                            DirectoryStructure: 'SINGLE_DIRECTORY',
                            SegmentsPerSubdirectory: 10000,
                            Mode: 'LIVE'
                        }
                    },
                    Name: 'TN2224',
                    Outputs: [
                        {
                            OutputSettings: {
                                HlsOutputSettings: {
                                    NameModifier: '_960x540_2000k',
                                    HlsSettings: {
                                        StandardHlsSettings: {
                                            M3u8Settings: {
                                                AudioPids: '492-498',
                                                EcmPid: '8182',
                                                PcrControl: 'PCR_EVERY_PES_PACKET',
                                                PmtPid: '480',
                                                Scte35Pid: '500',
                                                Scte35Behavior: 'NO_PASSTHROUGH',
                                                TimedMetadataPid: '502',
                                                TimedMetadataBehavior: 'NO_PASSTHROUGH',
                                                VideoPid: '481'
                                            },
                                            AudioRenditionSets: 'program_audio'
                                        }
                                    }
                                }
                            },
                            VideoDescriptionName: 'video_960_540',
                            AudioDescriptionNames: [
                                'audio_2_aac96'
                            ],
                            CaptionDescriptionNames: []
                        },
                        {
                            OutputSettings: {
                                HlsOutputSettings: {
                                    NameModifier: '_1280x720_3300k',
                                    HlsSettings: {
                                        StandardHlsSettings: {
                                            M3u8Settings: {
                                                AudioPids: '492-498',
                                                EcmPid: '8182',
                                                PcrControl: 'PCR_EVERY_PES_PACKET',
                                                PmtPid: '480',
                                                Scte35Pid: '500',
                                                Scte35Behavior: 'NO_PASSTHROUGH',
                                                TimedMetadataPid: '502',
                                                TimedMetadataBehavior: 'NO_PASSTHROUGH',
                                                VideoPid: '481'
                                            },
                                            AudioRenditionSets: 'program_audio'
                                        }
                                    }
                                }
                            },
                            VideoDescriptionName: 'video_1280_720_1',
                            AudioDescriptionNames: [
                                'audio_3_aac96'
                            ],
                            CaptionDescriptionNames: []
                        },
                        {
                            OutputSettings: {
                                HlsOutputSettings: {
                                    NameModifier: '_1280x720_5000k',
                                    HlsSettings: {
                                        StandardHlsSettings: {
                                            M3u8Settings: {
                                                AudioPids: '492-498',
                                                EcmPid: '8182',
                                                PcrControl: 'PCR_EVERY_PES_PACKET',
                                                PmtPid: '480',
                                                Scte35Pid: '500',
                                                Scte35Behavior: 'NO_PASSTHROUGH',
                                                TimedMetadataPid: '502',
                                                TimedMetadataBehavior: 'NO_PASSTHROUGH',
                                                VideoPid: '481'
                                            },
                                            AudioRenditionSets: 'program_audio'
                                        }
                                    }
                                }
                            },
                            VideoDescriptionName: 'video_1280_720_2',
                            AudioDescriptionNames: [
                                'audio_1_aac128'
                            ],
                            CaptionDescriptionNames: []
                        },
                        {
                            OutputSettings: {
                                HlsOutputSettings: {
                                    NameModifier: '_1280x720_6500k',
                                    HlsSettings: {
                                        StandardHlsSettings: {
                                            M3u8Settings: {
                                                AudioPids: '492-498',
                                                EcmPid: '8182',
                                                PcrControl: 'PCR_EVERY_PES_PACKET',
                                                PmtPid: '480',
                                                Scte35Pid: '500',
                                                Scte35Behavior: 'NO_PASSTHROUGH',
                                                TimedMetadataPid: '502',
                                                TimedMetadataBehavior: 'NO_PASSTHROUGH',
                                                VideoPid: '481'
                                            },
                                            AudioRenditionSets: 'program_audio'
                                        }
                                    }
                                }
                            },
                            VideoDescriptionName: 'video_1280_720_3',
                            AudioDescriptionNames: [
                                'audio_2_aac128'
                            ],
                            CaptionDescriptionNames: []
                        },
                        {
                            OutputSettings: {
                                HlsOutputSettings: {
                                    NameModifier: '_1920x1080_8000k',
                                    HlsSettings: {
                                        StandardHlsSettings: {
                                            M3u8Settings: {
                                                AudioPids: '492-498',
                                                EcmPid: '8182',
                                                PcrControl: 'PCR_EVERY_PES_PACKET',
                                                PmtPid: '480',
                                                Scte35Pid: '500',
                                                Scte35Behavior: 'NO_PASSTHROUGH',
                                                TimedMetadataPid: '502',
                                                TimedMetadataBehavior: 'NO_PASSTHROUGH',
                                                VideoPid: '481'
                                            },
                                            AudioRenditionSets: 'program_audio'
                                        }
                                    }
                                }
                            },
                            VideoDescriptionName: 'video_1920_1080',
                            AudioDescriptionNames: [
                                'audio_3_aac128'
                            ],
                            CaptionDescriptionNames: []
                        },
                        {
                            OutputSettings: {
                                HlsOutputSettings: {
                                    NameModifier: '_416x234_200k',
                                    HlsSettings: {
                                        StandardHlsSettings: {
                                            M3u8Settings: {
                                                AudioPids: '492-498',
                                                EcmPid: '8182',
                                                PcrControl: 'PCR_EVERY_PES_PACKET',
                                                PmtPid: '480',
                                                Scte35Pid: '500',
                                                Scte35Behavior: 'NO_PASSTHROUGH',
                                                TimedMetadataPid: '502',
                                                TimedMetadataBehavior: 'NO_PASSTHROUGH',
                                                VideoPid: '481'
                                            },
                                            AudioRenditionSets: 'program_audio'
                                        }
                                    }
                                }
                            },
                            VideoDescriptionName: 'video_416_234',
                            AudioDescriptionNames: [
                                'audio_1_aac64'
                            ],
                            CaptionDescriptionNames: []
                        },
                        {
                            OutputSettings: {
                                HlsOutputSettings: {
                                    NameModifier: '_480x270_400k',
                                    HlsSettings: {
                                        StandardHlsSettings: {
                                            M3u8Settings: {
                                                AudioPids: '492-498',
                                                EcmPid: '8182',
                                                PcrControl: 'PCR_EVERY_PES_PACKET',
                                                PmtPid: '480',
                                                Scte35Pid: '500',
                                                Scte35Behavior: 'NO_PASSTHROUGH',
                                                TimedMetadataPid: '502',
                                                TimedMetadataBehavior: 'NO_PASSTHROUGH',
                                                VideoPid: '481'
                                            },
                                            AudioRenditionSets: 'program_audio'
                                        }
                                    }
                                }
                            },
                            VideoDescriptionName: 'video_480_270',
                            AudioDescriptionNames: [
                                'audio_2_aac64'
                            ],
                            CaptionDescriptionNames: []
                        },
                        {
                            OutputSettings: {
                                HlsOutputSettings: {
                                    NameModifier: '_640x360_800k',
                                    HlsSettings: {
                                        StandardHlsSettings: {
                                            M3u8Settings: {
                                                AudioPids: '492-498',
                                                EcmPid: '8182',
                                                PcrControl: 'PCR_EVERY_PES_PACKET',
                                                PmtPid: '480',
                                                Scte35Pid: '500',
                                                Scte35Behavior: 'NO_PASSTHROUGH',
                                                TimedMetadataPid: '502',
                                                TimedMetadataBehavior: 'NO_PASSTHROUGH',
                                                VideoPid: '481'
                                            },
                                            AudioRenditionSets: 'program_audio'
                                        }
                                    }
                                }
                            },
                            VideoDescriptionName: 'video_640_360',
                            AudioDescriptionNames: [
                                'audio_3_aac64'
                            ],
                            CaptionDescriptionNames: []
                        },
                        {
                            OutputSettings: {
                                HlsOutputSettings: {
                                    NameModifier: '_768x432_1200k',
                                    HlsSettings: {
                                        StandardHlsSettings: {
                                            M3u8Settings: {
                                                AudioFramesPerPes: 4,
                                                AudioPids: '492-498',
                                                EcmPid: '8182',
                                                NielsenId3Behavior: 'NO_PASSTHROUGH',
                                                PcrControl: 'PCR_EVERY_PES_PACKET',
                                                PmtPid: '480',
                                                ProgramNum: 1,
                                                Scte35Pid: '500',
                                                Scte35Behavior: 'NO_PASSTHROUGH',
                                                TimedMetadataPid: '502',
                                                TimedMetadataBehavior: 'NO_PASSTHROUGH',
                                                VideoPid: '481'
                                            },
                                            AudioRenditionSets: 'program_audio'
                                        }
                                    },
                                    H265PackagingType: 'HVC1'
                                }
                            },
                            VideoDescriptionName: 'video_768_432',
                            AudioDescriptionNames: [
                                'audio_1_aac96'
                            ],
                            CaptionDescriptionNames: []
                        }
                    ]
                }
            ],
            TimecodeConfig: {
                Source: 'SYSTEMCLOCK'
            },
            VideoDescriptions: [
                {
                    CodecSettings: {
                        H264Settings: {
                            ColorMetadata: 'INSERT',
                            AdaptiveQuantization: 'HIGH',
                            Bitrate: 200000,
                            EntropyEncoding: 'CAVLC',
                            FlickerAq: 'ENABLED',
                            FramerateControl: 'SPECIFIED',
                            FramerateNumerator: 15000,
                            FramerateDenominator: 1001,
                            GopBReference: 'DISABLED',
                            GopNumBFrames: 0,
                            GopSize: 30,
                            GopSizeUnits: 'FRAMES',
                            Level: 'H264_LEVEL_3',
                            LookAheadRateControl: 'HIGH',
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            Profile: 'BASELINE',
                            RateControlMode: 'CBR',
                            Syntax: 'DEFAULT',
                            SceneChangeDetect: 'ENABLED',
                            SpatialAq: 'ENABLED',
                            TemporalAq: 'ENABLED'
                        }
                    },
                    Height: 236,
                    Name: 'video_416_234',
                    ScalingBehavior: 'DEFAULT',
                    Width: 416
                },
                {
                    CodecSettings: {
                        H264Settings: {
                            ColorMetadata: 'INSERT',
                            AdaptiveQuantization: 'HIGH',
                            Bitrate: 400000,
                            EntropyEncoding: 'CAVLC',
                            FlickerAq: 'ENABLED',
                            FramerateControl: 'SPECIFIED',
                            FramerateNumerator: 15000,
                            FramerateDenominator: 1001,
                            GopBReference: 'DISABLED',
                            GopNumBFrames: 0,
                            GopSize: 30,
                            GopSizeUnits: 'FRAMES',
                            Level: 'H264_LEVEL_3',
                            LookAheadRateControl: 'HIGH',
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            Profile: 'BASELINE',
                            RateControlMode: 'CBR',
                            Syntax: 'DEFAULT',
                            SceneChangeDetect: 'ENABLED',
                            SpatialAq: 'ENABLED',
                            TemporalAq: 'ENABLED'
                        }
                    },
                    Height: 272,
                    Name: 'video_480_270',
                    ScalingBehavior: 'DEFAULT',
                    Width: 480
                },
                {
                    CodecSettings: {
                        H264Settings: {
                            ColorMetadata: 'INSERT',
                            AdaptiveQuantization: 'HIGH',
                            Bitrate: 800000,
                            EntropyEncoding: 'CABAC',
                            FlickerAq: 'ENABLED',
                            FramerateControl: 'SPECIFIED',
                            FramerateNumerator: 30000,
                            FramerateDenominator: 1001,
                            GopBReference: 'ENABLED',
                            GopNumBFrames: 3,
                            GopSize: 60,
                            GopSizeUnits: 'FRAMES',
                            Level: 'H264_LEVEL_3',
                            LookAheadRateControl: 'HIGH',
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            Profile: 'MAIN',
                            RateControlMode: 'CBR',
                            Syntax: 'DEFAULT',
                            SceneChangeDetect: 'ENABLED',
                            SpatialAq: 'ENABLED',
                            TemporalAq: 'ENABLED'
                        }
                    },
                    Height: 360,
                    Name: 'video_640_360',
                    ScalingBehavior: 'DEFAULT',
                    Width: 640
                },
                {
                    CodecSettings: {
                        H264Settings: {
                            AfdSignaling: 'NONE',
                            ColorMetadata: 'INSERT',
                            AdaptiveQuantization: 'HIGH',
                            Bitrate: 1200000,
                            EntropyEncoding: 'CABAC',
                            FlickerAq: 'ENABLED',
                            ForceFieldPictures: 'DISABLED',
                            FramerateControl: 'SPECIFIED',
                            FramerateNumerator: 30000,
                            FramerateDenominator: 1001,
                            GopBReference: 'ENABLED',
                            GopClosedCadence: 1,
                            GopNumBFrames: 3,
                            GopSize: 60,
                            GopSizeUnits: 'FRAMES',
                            SubgopLength: 'FIXED',
                            ScanType: 'PROGRESSIVE',
                            Level: 'H264_LEVEL_4_1',
                            LookAheadRateControl: 'HIGH',
                            NumRefFrames: 1,
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            Profile: 'MAIN',
                            RateControlMode: 'CBR',
                            Syntax: 'DEFAULT',
                            SceneChangeDetect: 'ENABLED',
                            SpatialAq: 'ENABLED',
                            TemporalAq: 'ENABLED',
                            TimecodeInsertion: 'DISABLED'
                        }
                    },
                    Height: 432,
                    Name: 'video_768_432',
                    RespondToAfd: 'NONE',
                    Sharpness: 50,
                    ScalingBehavior: 'DEFAULT',
                    Width: 768
                },
                {
                    CodecSettings: {
                        H264Settings: {
                            ColorMetadata: 'INSERT',
                            AdaptiveQuantization: 'HIGH',
                            Bitrate: 2200000,
                            EntropyEncoding: 'CABAC',
                            FlickerAq: 'ENABLED',
                            FramerateControl: 'SPECIFIED',
                            FramerateNumerator: 30000,
                            FramerateDenominator: 1001,
                            GopBReference: 'ENABLED',
                            GopNumBFrames: 3,
                            GopSize: 60,
                            GopSizeUnits: 'FRAMES',
                            Level: 'H264_LEVEL_4_1',
                            LookAheadRateControl: 'HIGH',
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            Profile: 'HIGH',
                            RateControlMode: 'CBR',
                            Syntax: 'DEFAULT',
                            SceneChangeDetect: 'ENABLED',
                            SpatialAq: 'ENABLED',
                            TemporalAq: 'ENABLED'
                        }
                    },
                    Height: 540,
                    Name: 'video_960_540',
                    ScalingBehavior: 'DEFAULT',
                    Width: 960
                },
                {
                    CodecSettings: {
                        H264Settings: {
                            ColorMetadata: 'INSERT',
                            AdaptiveQuantization: 'HIGH',
                            Bitrate: 3300000,
                            EntropyEncoding: 'CABAC',
                            FlickerAq: 'ENABLED',
                            FramerateControl: 'SPECIFIED',
                            FramerateNumerator: 30000,
                            FramerateDenominator: 1001,
                            GopBReference: 'ENABLED',
                            GopNumBFrames: 3,
                            GopSize: 60,
                            GopSizeUnits: 'FRAMES',
                            Level: 'H264_LEVEL_4_1',
                            LookAheadRateControl: 'HIGH',
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            Profile: 'HIGH',
                            RateControlMode: 'CBR',
                            Syntax: 'DEFAULT',
                            SceneChangeDetect: 'ENABLED',
                            SpatialAq: 'ENABLED',
                            TemporalAq: 'ENABLED'
                        }
                    },
                    Height: 720,
                    Name: 'video_1280_720_1',
                    ScalingBehavior: 'DEFAULT',
                    Width: 1280
                },
                {
                    CodecSettings: {
                        H264Settings: {
                            ColorMetadata: 'INSERT',
                            AdaptiveQuantization: 'HIGH',
                            Bitrate: 4700000,
                            EntropyEncoding: 'CABAC',
                            FlickerAq: 'ENABLED',
                            FramerateControl: 'SPECIFIED',
                            FramerateNumerator: 30000,
                            FramerateDenominator: 1001,
                            GopBReference: 'ENABLED',
                            GopNumBFrames: 3,
                            GopSize: 60,
                            GopSizeUnits: 'FRAMES',
                            Level: 'H264_LEVEL_4_1',
                            LookAheadRateControl: 'HIGH',
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            Profile: 'HIGH',
                            RateControlMode: 'CBR',
                            Syntax: 'DEFAULT',
                            SceneChangeDetect: 'ENABLED',
                            SpatialAq: 'ENABLED',
                            TemporalAq: 'ENABLED'
                        }
                    },
                    Height: 720,
                    Name: 'video_1280_720_2',
                    ScalingBehavior: 'DEFAULT',
                    Width: 1280
                },
                {
                    CodecSettings: {
                        H264Settings: {
                            ColorMetadata: 'INSERT',
                            AdaptiveQuantization: 'HIGH',
                            Bitrate: 6200000,
                            EntropyEncoding: 'CABAC',
                            FlickerAq: 'ENABLED',
                            FramerateControl: 'SPECIFIED',
                            FramerateNumerator: 30000,
                            FramerateDenominator: 1001,
                            GopBReference: 'ENABLED',
                            GopNumBFrames: 3,
                            GopSize: 60,
                            GopSizeUnits: 'FRAMES',
                            Level: 'H264_LEVEL_4_1',
                            LookAheadRateControl: 'HIGH',
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            Profile: 'HIGH',
                            RateControlMode: 'CBR',
                            Syntax: 'DEFAULT',
                            SceneChangeDetect: 'ENABLED',
                            SpatialAq: 'ENABLED',
                            TemporalAq: 'ENABLED'
                        }
                    },
                    Height: 720,
                    Name: 'video_1280_720_3',
                    ScalingBehavior: 'DEFAULT',
                    Width: 1280
                },
                {
                    CodecSettings: {
                        H264Settings: {
                            ColorMetadata: 'INSERT',
                            AdaptiveQuantization: 'HIGH',
                            Bitrate: 8000000,
                            EntropyEncoding: 'CABAC',
                            FlickerAq: 'ENABLED',
                            FramerateControl: 'SPECIFIED',
                            FramerateNumerator: 30000,
                            FramerateDenominator: 1001,
                            GopBReference: 'DISABLED',
                            GopNumBFrames: 1,
                            GopSize: 60,
                            GopSizeUnits: 'FRAMES',
                            Level: 'H264_LEVEL_4_1',
                            LookAheadRateControl: 'HIGH',
                            ParControl: 'INITIALIZE_FROM_SOURCE',
                            Profile: 'HIGH',
                            RateControlMode: 'CBR',
                            Syntax: 'DEFAULT',
                            SceneChangeDetect: 'ENABLED',
                            SpatialAq: 'ENABLED',
                            TemporalAq: 'ENABLED'
                        }
                    },
                    Height: 1080,
                    Name: 'video_1920_1080',
                    ScalingBehavior: 'DEFAULT',
                    Width: 1920
                }
            ]
        },
        RoleArn: 'arn:aws:iam::837082807967:role/MediaLiveAccessRole',
        InputSpecification: {
            Codec: 'AVC',
            Resolution: 'HD',
            MaximumBitrate: 'MAX_20_MBPS'
        },
        LogLevel: 'DISABLED',
        // tags: {},
        ChannelClass: 'SINGLE_PIPELINE',
        // pipelineDetails: []
    }
    //
    const channel = await medialive.createChannel(mediaLiveChannelParams).promise()

    return channel
}