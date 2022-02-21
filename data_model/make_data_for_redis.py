

if __name__ == "__main__":
    with open('./data.csv') as data_source:
        car_data = data_source.read()

    car_data_trimmed = car_data.rstrip('\n')
    car_data_listed = car_data_trimmed.split('\n')

    data_headings = car_data_listed[0].split(',')

    for line in car_data_listed[1:]:
        temp_dict = dict(zip(data_headings, line.split(',')))
        model = temp_dict.pop('Model')
        for key, value in temp_dict.items():
            with open("data_bulk.txt", "a") as bulk_file:
                bulk_file.write(f'*4\r\n$4\r\nZADD\r\n${len(key)}\r\n{key}\r\n${len(value)}\r\n{value}\r\n${len(model)}\r\n{model}\r\n')
        break
                
