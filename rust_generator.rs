use std::env;
use urlencoding::encode;

fn convert_youtube_url(url: &str) -> String {
    if url.contains("youtube.com") || url.contains("youtu.be") {
        // Простая конвертация для YouTube
        if let Some(video_id) = extract_youtube_id(url) {
            return format!("https://www.youtube.com/embed/{}", video_id);
        }
    }
    url.to_string()
}

fn extract_youtube_id(url: &str) -> Option<String> {
    // Простое извлечение ID для демонстрации
    if url.contains("v=") {
        let parts: Vec<&str> = url.split("v=").collect();
        if parts.len() > 1 {
            return Some(parts[1].to_string());
        }
    }
    None
}

fn main() {
    let args: Vec<String> = env::args().collect();
    
    if args.len() < 2 {
        println!("Использование: {} <url>", args[0]);
        return;
    }
    
    let video_url = &args[1];
    let embedded_url = convert_youtube_url(video_url);
    
    println!("Оригинальная ссылка: {}", video_url);
    println!("Ссылка для плеера: {}", embedded_url);
    println!("Генерируемая ссылка: https://your-site.github.io/?stream={}", encode(&embedded_url));
}
