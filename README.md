magic command to convert nmos is-04 api schema to zod:
```
ls *.json | perl -e'while(<>){chomp;system("json-refs resolve $_ | json-schema-to-zod | prettier --parser typescript > $_.ts");print $_."\n"}'
mkdir zod
mv *.ts zod/
```

voilla!