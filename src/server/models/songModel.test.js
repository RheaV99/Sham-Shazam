const mongoose = require('mongoose');
const Song = require('./songModel');

describe('Song model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create and save a new song successfully', async () => {
    const song = new Song({
      title: 'Test song',
      artist: 'Test artist',
      user: 'JohnDoe',
      song_link: 'https://test-link.com/',
    });
    const savedSong = await song.save();
    expect(savedSong._id).toBeDefined();
    expect(savedSong.title).toBe('Test song');
    expect(savedSong.artist).toBe('Test artist');
    expect(savedSong.user).toBe('JohnDoe');
    expect(savedSong.song_link).toBe('https://test-link.com/');
    expect(savedSong.createdAt).toBeDefined();
  });

  it('should not save a song without a required field', async () => {
    const songWithoutTitle = new Song({
      artist: 'Test artist',
      user: 'JohnDoe',
      song_link: 'https://test-link.com/',
    });
    let err;
    try {
      await songWithoutTitle.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
  });
});