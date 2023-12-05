const { saveSong } = require('../controllers/songController');
const Song = require('../models/songModel')

// mock request
const req = {
    files: {
        audio: {
            data: Buffer.from('test-audio-file')
        }
    },
    body: {
        user_id: 'test-user-id'
    }
};

//mock Song model
jest.mock('../models/songModel', () => ({
    create:jest.fn()
}));

describe('saveSong', () => {
    it('Save song and return JSON response', async () => {
        const mockSong = {
            title: 'Test song',
            artist: 'Test artist',
            user: 'test-user-id',
            song_link: 'test song link'
        };
        Song.create.mockResolvedValue(mockSong);

        await saveSong(req, res);

        expect(Song.create).toHaveBeenCalledWith({
            title: mockSong.title,
            artist: mockSong.artist,
            user: mockSong.user,
            song_link: mockSong.song_link
        });
        expect(res.json).toHaveBeenCalledWith(mockSong);
    });
});