import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? '', 'public/catalogo/images');

export const POST = async (req: NextRequest) => {
	const formData = await req.formData();
	const body = Object.fromEntries(formData);
	const file = (body.file as Blob) || null;

	console.log(file);
	if (file) {
		const buffer = Buffer.from(await file.arrayBuffer());
		if (!fs.existsSync(UPLOAD_DIR)) {
			fs.mkdirSync(UPLOAD_DIR);
		}

		fs.writeFileSync(path.resolve(UPLOAD_DIR, (body.file as File).name), new Uint8Array(buffer));
	} else {
		return NextResponse.json({
			success: false,
		});
	}

	return NextResponse.json({
		success: true,
		name: (body.file as File).name,
		path: `/catalogo/images/${(body.file as File).name}`,
		type: (body.file as File).type,
	});
};
