import fs from 'fs';
import readline from 'readline';
import { google, drive_v3 } from 'googleapis';
import Constants from '../constants/Constants';

export default class GoogleDriveService {
  private static SCOPES = ['https://www.googleapis.com/auth/drive'];
  private static TOKEN_PATH = './token.json';
  private static drive: drive_v3.Drive;

  public static init() {
    // Load client secrets from a local file.
    fs.readFile('./credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      this.authorize(JSON.parse(content.toString()));
    });
  }

  private static authorize(credentials) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    if (!Constants.HAVE_TOKEN) {
      return this.getAccessToken(oAuth2Client);
    } else {
      oAuth2Client.setCredentials(Constants.GOOGLE_TOKEN);
      this.drive = google.drive({ version: 'v3', auth: oAuth2Client });
      console.log('Google Drive initialized');
    }
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   */
  private static getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.SCOPES
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', this.TOKEN_PATH);
        });
      });
    });
  }

  public static async saveFile(media) {
    const file = await this.drive.files.create({ media });
    return file.data.id;
  }
  /**
   * Lists the names and IDs of up to 10 files.
   */
  public static listFiles() {
    this.drive.files.list(
      {
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)'
      },
      (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
          console.log('Files:');
          files.map((file) => {
            console.log(`${file.name} (${file.id})`);
          });
        } else {
          console.log('No files found.');
        }
      }
    );
  }
}
