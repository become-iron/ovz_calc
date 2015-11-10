# a = []
# x = input('номер квалитета')
# z = 30
# for i in range(18):
#     y = z
#     z = int(input('верхний предел'))
#     a.append([y, z, int(6+i)])
#
# print(a)

a = []
k = int(input('Квалитет: '))
n = int(input('Код допуска: '))
if n >= 29:
    p = 0
else:
    p = 1

j = 0
for i in range(25):
    if j == 1:
        j = 0
        continue
    elif j == 2:
        j = 1
        continue

    try:
        if n in [12, 40]:
            x = input('Верхний предел ')
            try:
                x = int(x)
            except ValueError:
                x = float(x)
            y = -x
        else:
            if n == 11:
                x = 0
            else:
                x = int(input('Верхний предел '))

            if n == 39:
                y = 0
            else:
                y = int(input('Нижний предел '))
    except ValueError:
        x = ""
        y = ""

    if n <= 11 or n >= 44:
        x = -x
        y = -y
    a.append([p, i, k, n, [x, y]])

    if n in [18, 19, 46, 47]:
        if i in [3, 5, 7]:
            a.append([p, i+1, k, n, [x, y]])
            j = 1

    elif n in [1, 2, 3, 31]:
        if i in [3, 5]:
            a.append([p, i+1, k, n, [x, y]])
            j = 1

    elif n in [20, 21, 48, 49]:
        if i in [3]:
            a.append([p, i+1, k, n, [x, y]])
            j = 1

    elif n in list(list(range(0, 18)) + list(range(29, 46))):
        if i in [3, 5, 7, 9, 11, 19, 21, 23]:
            a.append([p, i+1, k, n, [x, y]])
            j = 1
        elif i in [13, 16]:
            a.append([p, i+1, k, n, [x, y]])
            a.append([p, i+2, k, n, [x, y]])
            j = 2


file_path = 'result'
with open(file_path, "w", encoding="utf-8") as w:
    for item in a:
        w.write(str(item) + "," + "\n")
