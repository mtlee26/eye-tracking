// pages/api/proxy.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Gửi yêu cầu đến gutendex.com (hoặc bất kỳ dịch vụ nào)
		const response = await fetch('https://gutendex.com/books/?search=pride+and+prejudice');

		// Kiểm tra nếu có lỗi từ API bên ngoài
		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		// Lấy dữ liệu từ response của API
		const data = await response.json();

		// Trả dữ liệu về cho client
		res.status(200).json(data);
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).json({ error: 'Error fetching book details' });
	}
}
