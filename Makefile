# make 命令制作器,直接编写该文件就可以使用make命令
# 例如 make new xx 创建组件
default: help

# build theme
build-theme:
	npm run build:theme

build-dev:
	npm run build:dev

demo:
	npm run demo

doc:
	npm run doc

lib:
	npm run lib

entry:
	node build/build-entry.js

new:
	node build/new-component.js $(filter-out $@,$(MAKECMDGOALS)) && node build/build-entry.js

help:
	@echo "   \033[35mmake\033[0m \033[1m命令使用说明\033[0m"
	@echo "   \033[35mmake lib\033[0m\t\033[0m\t\033[0m\t\033[0m\t---  打包组件库"
	@echo "   \033[35mmake new <component-name>\033[0m\t\033[0m\t---  创建新组件 例如 'make new button'"
