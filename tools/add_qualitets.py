# a = []
# x = input('номер квалитета')
# z = 30
# for i in range(18):
#     y = z
#     z = int(input('верхний предел'))
#     a.append([y, z, int(6+i)])
#
# print(a)

tol_zones = {
        0  : '—',
        1  :  'a',
        2  :  'b',
        3  :  'c',
        4  : 'cd',
        5  :  'd',
        6  :  'e',
        7  : 'ef',
        8  :  'f',
        9  : 'fg',
        10 :  'g',
        11 :  'h',
        12 : 'js',
        13 :  'j',
        14 :  'k',
        15 :  'm',
        16 :  'n',
        17 :  'p',
        18 :  'r',
        19 :  's',
        20 :  't',
        21 :  'u',
        22 :  'v',
        23 :  'x',
        24 :  'y',
        25 :  'z',
        26 : 'za',
        27 : 'zb',
        28 : 'zc',
        29 :  'A',
        30 :  'B',
        31 :  'C',
        32 : 'CD',
        33 :  'D',
        34 :  'E',
        35 : 'EF',
        36 :  'F',
        37 : 'FG',
        38 :  'G',
        39 :  'H',
        40 : 'JS',
        41 :  'J',
        42 :  'K',
        43 :  'M',
        44 :  'N',
        45 :  'P',
        46 :  'R',
        47 :  'S',
        48 :  'T',
        49 :  'U',
        50 :  'V',
        51 :  'X',
        52 :  'Y',
        53 :  'Z',
        54 : 'ZA',
        55 : 'ZB',
        56 : 'ZC'
    }

a = []
k = int(input('Квалитет: '))
t = str(input('Поле допуска: '))
for key, value in tol_zones.items():
    if value == t:
        n = key
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
        try:
            x = -x
            y = -y
        except TypeError:
            pass
    a.append([p, i, k, n, [x, y]])

    if n in [18, 19, 46, 47]:
        if i in [3, 5, 7]:
            a.append([p, i+1, k, n, [x, y]])
            j = 1

    elif n in [1, 2, 3, 29, 30, 31]:
        if i in [3, 5]:
            a.append([p, i+1, k, n, [x, y]])
            j = 1

    elif n in [20, 21, 48, 49]:
        if i in [3]:
            a.append([p, i+1, k, n, [x, y]])
            j = 1

    elif n in list(list(range(4, 18)) + list(range(32, 46))):
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
