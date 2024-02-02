## Before Running

### Install Conda

**Quick command line install [ClickHere](https://docs.conda.io/projects/miniconda/en/latest/#quick-command-line-install)**

These quick command line instructions will get you set up quickly with the latest Miniconda installer. For graphical
installer (.exe and .pkg) and hash checking instructions,
see[Installing Miniconda](https://docs.conda.io/projects/miniconda/en/latest/miniconda-install.html).

These four commands quickly and quietly install the latest M1 macOS version of the installer and then clean up after
themselves. To install a different version or architecture of Miniconda for macOS, change the name of the`.sh`installer
in the`curl`command.

```bash
mkdir -p ~/miniconda3
curl https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-arm64.sh -o ~/miniconda3/miniconda.sh
bash ~/miniconda3/miniconda.sh -b -u -p ~/miniconda3
rm -rf ~/miniconda3/miniconda.sh
```

After installing, initialize your newly-installed Miniconda. The following commands initialize for bash and zsh shells:

```bash
~/miniconda3/bin/conda init bash
~/miniconda3/bin/conda init zsh
```

### Install Node.js By NVM

`nvm`（Node Version Manager）是一个非常强大的工具，用于管理多个 Node.js 版本。以下是其常见用法的一些例子

**安装 nvm**

通常，你可以按照以下步骤在 bash 或 zsh 等 shell 中安装 nvm

```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

**列出所有可用的 Node.js 版本**

```shell
nvm ls-remote
```

**安装特定版本的 Node.js**

```shell
nvm install 14.17.0
```

**切换 Node.js 版本**

```shell
nvm use 14.17.0
```

**列出本地已安装的所有 Node.js 版本**

```shell
nvm ls
```

**设置默认的 Node.js 版本**

```shell
nvm alias default 14.17.0
```

**卸载一个 Node.js 版本**

```shell
nvm uninstall 14.17.0
```

**其他命令**

```shell
nvm --help
```

记住，当使用 `nvm` 安装 Node.js 时，`npm`（Node.js 的包管理器）也会随之安装。因此，当你切换 Node.js 版本时，`npm` 的版本也可能会随之更改。

此外，当你使用 `nvm` 安装或切换版本时，它仅影响当前用户。如果你有其他系统用户，他们将需要独立安装和管理他们自己的 Node.js
版本。

## Run Backend Server

```shell
cd src
conda create -n new-ez-stock python=3.11
conda activate new-ez-stock

sh migrate.sh
pip install poetry
poetry run django createsuperuser
poetry run django runserver
```

## Run Frontend Server

```shell
cd frontend
npm install
npm run dev
```

## Step to create docs

`mkdocs serve -a localhost:8080`
