import { getMimeType, getFileExtension, getQualifier } from '../../../src/js/commons/file';

let mp4, jpg, mp3, flv, srt, mkv, other;

describe('Commons file spec', () => {
	beforeAll(() => {
		mp4 = 'Deepwater.Horizon.2016.1080p.BluRay.x264-[YTS.AG].mp4';
		jpg = 'Screen Shot 2017-10-28 at 10.47.04.jpg';
		mp3 = 'S2 E6 Full House.mp3';
		flv = 'WhatsApp Video 2017-09-01 at 09.39.14.flv';
		mkv = 'The.Walking.Dead.S08E05.REPACK.720p.HDTV.x264-AVS[eztv].mkv';
		srt = 'Before.Sunset.2004.720p.BrRip.x264.YIFY.srt';
	})

	it('Should return correct mimetypes', () => {
		expect(getMimeType(mkv)).toBe('video/mkv');
		expect(getMimeType(mp4)).toBe('video/mp4');
		expect(getMimeType(jpg)).toBe('image/jpeg');
		expect(getMimeType(mp3)).toBe('audio/mpeg');
		expect(getMimeType(flv)).toBe('video/x-flv');
		expect(getMimeType(srt)).toBe('text/plain');
	});

	it('Should return correct qualifiers', () => {
		expect(getQualifier(mkv)).toBe('VIDEO');
		expect(getQualifier(mp4)).toBe('VIDEO');
		expect(getQualifier(jpg)).toBe('IMAGE');
		expect(getQualifier(mp3)).toBe('AUDIO');
		expect(getQualifier(flv)).toBe('VIDEO');
		expect(getQualifier(srt)).toBe('CAPTION');
	});

	it('Should return correct extensions', () => {
		expect(getFileExtension(mkv)).toBe('mkv');
		expect(getFileExtension(mp4)).toBe('mp4');
		expect(getFileExtension(jpg)).toBe('jpg');
		expect(getFileExtension(mp3)).toBe('mp3');
		expect(getFileExtension(flv)).toBe('flv');
		expect(getFileExtension(srt)).toBe('srt');
	});

});

