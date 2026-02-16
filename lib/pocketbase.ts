import PocketBase from 'pocketbase';

const BASE = "https://anvl.pockethost.io";

export const pb = new PocketBase(BASE);

export const imagesCollection = pb.collection('images');

/**
 * Poll for image generation result
 */
export async function getGeneratedImageURL(recordId: string): Promise<string> {
  let record = await imagesCollection.getOne(recordId);

  // Poll until result is available
  while (!record.result) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    record = await imagesCollection.getOne(record.id);
  }

  if (record.result.data && record.result.data[0]?.url) {
    return 'https://no-cors.deno.dev/' + record.result.data[0].url;
  } else if (record.result.error) {
    throw new Error(record.result.error.message || 'Image generation failed');
  } else {
    throw new Error('Unknown error during image generation');
  }
}

/**
 * Create an image generation request
 */
export async function createImageGeneration(file: File, prompt: string): Promise<string> {
  const form = new FormData();
  form.append('input', file);
  form.append('prompt', prompt);

  const record = await imagesCollection.create(form);
  return record.id;
}

/**
 * Complete image generation flow
 */
export async function generateImage(file: File, prompt: string): Promise<string> {
  const recordId = await createImageGeneration(file, prompt);
  const imageUrl = await getGeneratedImageURL(recordId);
  return imageUrl;
}