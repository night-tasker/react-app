import os

with open('.env', 'r') as file:
    lines = file.readlines()

with open('.env.production', 'w') as file:
    for line in lines:
        # Разделяем строку на имя переменной и имя переменной окружения
        var_name, env_var_name = line.strip().split('=')
        if env_var_name.startswith('$'):
            env_var_name = env_var_name[1:]  # Удаляем символ '$'

        # Получаем значение переменной окружения
        value = os.environ.get(env_var_name, '')
        
        # Записываем в новый файл
        file.write(f'{var_name}={value}\n')
    
os.remove('.env')
os.rename('.env.production', '.env')
