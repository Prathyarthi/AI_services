import { NextRequest, NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    const options: any = {
      mode: 'text',
      pythonPath: 'C:\\Users\\PRATHYARTHI\\AppData\\Local\\Programs\\Python\\Python311\\python.exe', 
      scriptPath: path.join(process.cwd(), '/src/questions'),
      args: [query],
      };
    
    const [results] = await PythonShell.run('questions.py', options);

    return NextResponse.json({ result: results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
