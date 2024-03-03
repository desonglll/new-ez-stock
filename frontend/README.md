## npm install

```shell
npm install --force
```

## 上线部署

- 修改 `ListPage.tsx` 内 `` href={`http://localhost:8000/admin/products/product/${record.id}/change/`} ``

- 修改 `main.tsx` 内 `axios.defaults.baseURL = "http://localhost:8000";`

## TODO

完成AttrEdit的组件重构