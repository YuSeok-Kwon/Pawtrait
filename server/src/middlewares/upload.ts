import multer from 'multer';
import path from 'path';

// 파일 저장 설정
const storage = multer.diskStorage({
  // 파일을 저장할 폴더
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  
  // 파일 이름 만들기 (중복 방지)
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1000000);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueName + fileExtension);
  },
});

// 이미지 파일만 허용하는 필터
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    // 이미지 파일이면 OK
    cb(null, true);
  } else {
    // 이미지가 아니면 에러
    cb(new Error('이미지 파일만 업로드 가능합니다'), false);
  }
};

// 파일 업로드 설정
export const upload = multer({
  storage,           // 저장 설정
  fileFilter,        // 파일 필터
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 기본 10MB
  },
});
