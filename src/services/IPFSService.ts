import axios, { AxiosResponse } from 'axios';
import IIPFSMetadata from '../domain/IIPFSMetadata';

export default class IPFSService {
  public static async getMetadata(url: string): Promise<IIPFSMetadata> {
    const response: AxiosResponse = await axios.get(url);
    return { name: response.data.name, description: response.data.description, image: response.data.image };
  }
}
