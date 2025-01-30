import fetchInstance from '@/api/instance/instance'

const imagePath = '/api/v1/aws/presigned-url'

export const getPresignedUrl = async (fileName: string, contentType: string): Promise<string> => {
  const response = await fetchInstance.get(imagePath, { params: { fileName, contentType } })

  return response.data.result.preSignedUrl
}
