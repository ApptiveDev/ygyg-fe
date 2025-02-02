import fetchInstance from '@/api/instance/instance'

const imagePath = '/api/v1/aws/presigned-url/put'
const deleteImagePath = '/api/v1/aws/s3/'

export const getPresignedUrl = async (fileName: string, contentType: string): Promise<string> => {
  const response = await fetchInstance.get(imagePath, { params: { fileName, contentType } })

  return response.data.result.preSignedUrl
}

export const deleteImage = async (imagePath: string): Promise<void> => {
  const response = await fetchInstance.delete(`${deleteImagePath}${imagePath}`)
  return response.data.isSuccess
}
