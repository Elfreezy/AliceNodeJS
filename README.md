**Требуемые пакеты:**
- micro
- nodemon

**Команда установки пакета:**
> npm install <package_name>

**Запуск сервера:**
> node index.js			// Server started on http://localhost:3000

> npx nodemon index.js	// Альтернатива при разработке. Для отслеживания изменений

**Запуск туннелера ngrok:**
> ngrok http 4040


*Ближайшее:*
- [ X ] Добавить к структуре отдельный ключ для голосовых сообщений
- [ ] Добавить интересные факты
- [ ] Добавить картинки и музыкальные эффекты
- [ ] Отслеживать состояние с помощью сессий
- [ ] Воспользоваться instans для ключевых слов

> Можно вставлять отрывки вопроса в ответ? 
> Сделать один обработчик ответов на ключевые слова ..Запихнуть в switch параметры у каждого ID

*Ошибки:*
- Если не использовать кнопки, state не сохраняется
- Базовые интенты игнорируют аудио ответ
