import * as cheerio from 'cheerio';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

// Hàm xử lý yêu cầu API
async function handler(): Promise<string> {
	try {
		// Thực hiện yêu cầu đến URL bên ngoài (ví dụ: từ Gutenberg)
		const response = await axios.get<string>('https://www.gutenberg.org/ebooks/1342.html.images');
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw new Error('Failed to fetch data');
	}
}

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
	try {
		const html = await handler();
		const $ = cheerio.load(html);

		const chapters: { title: string; content: string[] }[] = [];

		$('h2').each((i, el) => {
			const title = $(el).text().trim();
			const content: string[] = [];

			let next = $(el).next();
			while (next.length && next.prop('tagName')?.toLowerCase() !== 'h2') {
				if (next.prop('tagName')?.toLowerCase() === 'p') {
					content.push(next.text().trim());
				}
				next = next.next();
			}

			chapters.push({ title, content });
		});

		res.status(200).json({ chapters });
	} catch (error: any) {
		res.status(500).json({ error: error.message || 'Internal Server Error' });
	}
}
