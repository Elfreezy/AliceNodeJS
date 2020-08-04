**Требуемые пакеты:**
- micro
- nodemon

**Команда установки пакета:**
> npm install <package_name>

**Запуск сервера:**
> node index.js			// Server started on http://localhost:3000
>
> npx nodemon index.js	// Альтернатива при разработке. Для отслеживания изменений

**Запуск туннелера ngrok:**
> ngrok http <port>


*Ближайшее:*
- [ ] Воспользоваться intents для наводящих слов

***

### Шпаргалка

> - Можно вставлять отрывки вопроса в ответ? 
> - Сделать один обработчик ответов на ключевые слова ..Запихнуть в switch параметры у каждого ID
> - Факты реализовать через обращение к файлу с информацие. В сессии проверять просмотренные факты
> и присылать иные. Сброс сессии, если все факты просмотрены
> - Сохранять в моих запросах состояние(сессия value) на согласие/отказ для соотв. перехода
> - Обработка несколько ключевых слов?

#### Done:
- [X] Добавить к структуре отдельный ключ для голосовых сообщений
- [X] Добавить интересные факты
- [X] Добавить картинки и музыкальные эффекты к фактам
- [X] Отслеживать состояние с помощью сессий

*Ошибки:*
- Работают в основном только кнопки для перехода
- Базовые интенты игнорируют аудио ответ
