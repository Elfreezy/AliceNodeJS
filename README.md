**Требуемые пакеты:**
- micro
- nodemon
- az

## Commands

**Установка зависимостей**
> npm i

**Команда установки пакета:**
> npm install <package_name>


**Запуск сервера:**
> node index.js			// Server started on http://localhost:3000
>
> npx nodemon index.js	// Альтернатива при разработке. Для отслеживания изменений

**Запуск туннелера ngrok:**
> ngrok http <port>

***

### Шпаргалка

> - Вынести курсы / факультеты в отдельные intents?
> - Добавить commands в metadata.json?
> - Можно вставлять отрывки вопроса в ответ для разнообразия?
> - Сохранять в моих запросах состояние(сессия value) на согласие/отказ для соотв. перехода
> - Обработка несколько ключевых слов в value?

*Ближайшее:*
- [X] Добавить массив из ключевых слов 
- [ ] Добавить корректное отображение ключевых слов или реконструировать навык
- [ ] Использовать session state для отображения ключевых слов
- [ ] Добавить ответ на <помощь / что ты умеешь>
- [ ] Добавить рандомных ответов
- [ ] Добавить действия для базовых intents

*Done:*
- [X] Добавить к структуре отдельный ключ для голосовых сообщений
- [X] Добавить интересные факты
- [X] Добавить картинки и музыкальные эффекты к фактам
- [X] Отслеживать состояние с помощью сессий
- [X] Воспользоваться intents для наводящих слов

*Фитчи:*
- Ответы в metadata.json могут повторяться. Ключевые слова нельзя употреблять в едином вопросе,
если они используются для разных
- В предложении рассматривается только одно составное ключевое слово
- Выводятся рандомные ключевые слова, которые могут повторяться (пока что не используется сессия)


*Ошибки:*
- Дублируются ключевые слова при их выводе
- Базовые интенты игнорируют аудио ответ
- Плохо воспринимает положительные ответы написанные вручную
