$(function () {

    // 创建对象
    class TableDemo {
        constructor(obj) {
            this.$table = $('#table')
            this.$btnSearch = $('#search_btn')                  // 搜索按钮
            this.$addForm = $('#addForm')                       // 添加表单
            this.$btn_add = $('#btn_add')                       // 新增按钮
            this.$add_backBtn = $('#add_backBtn')               // 新增页面的返回按钮
            this.$tableBody = $('.tableBody')                   // 主页面
            this.$addBody = $('.addBody')                       // 新增页面

            // 增加按钮事件
            this.$btn_add.click(() => {
                
                console.log($('.tableBody'))
                this.$tableBody.addClass('animated slideOutLeft')
                setTimeout(() => {
                    this.$tableBody.removeClass('animated slideOutLeft').css('display', 'none')
                }, 500)
                this.$addBody.css('display', 'block')
                this.$addBody.addClass('animated slideInRight')
            })

            // 增加页面返回按钮事件
            this.$add_backBtn.click(() => {
                this.$addBody.addClass('animated slideOutLeft')
                
                setTimeout(() => {
                    this.$addBody.removeClass('animated slideOutLeft').css('display', 'none')
                }, 500)

                this.$tableBody.css('display', 'block').addClass('animated slideInRight')

                // 重置表单所有验证规则
                this.$addForm.data('bootstrapValidator').resetForm(true)
            })

            // 初始化
            this.TableInit(obj)

            // 表单验证
            this.bootstrapValidator()
        }

        TableInit (obj) {
            this.$table.bootstrapTable({
                url: './api/bootstrapTable.php',
                toolbar: '#toolbar',        // 指定工作栏
                toolbarAlign: 'right',      // 工具栏对齐方式
                buttonsAlign: 'right',      // 按钮对齐方式
                showRefresh: true,          // 刷新按钮
                showColumns: true,          // 是否显示内容列下拉框。
                showToggle: true,           // 是否显示切换视图（table/card）按钮。
                striped: true,              // 是否显示行间隔色
                clickToSelect: false,        // 是否启用点击选中行
                cache: false,               // 是否使用缓存
                uniqueId: "ID",             // 每一行的唯一标识，一般为主键列
                pageNumber: 1,              // 初始化加载第一页，默认第一页
                pageSize: "5",              // 每页显示
                pageList: [5, 10, 20, 30],  // 分页步进值
                pagination: true,           // 是否分页
                sortable: false,            // 是否启用排序
                queryParams: this.queryParams,   // 请求服务器时所传的参数
                columns: [
                    {
                        title: '全选',
                        field: 'select',
                        checkbox: true,
                        width: 25,
                        align: 'center',
                        valign: 'middle'
                    },
                    {
                        title: 'ID',
                        field: 'ID',
                        visible: false
                    },
                    {
                        title: '登录名',
                        field: 'LoginName',
                        sortable: true
                    },
                    {
                        title: '姓名',
                        field: 'Name',
                        sortable: true
                    },
                    {
                        title: '手机号',
                        field: 'Tel',
                    },
                    {
                        title: '邮箱',
                        field: 'Email'
                    },
                    {
                        title: '注册日期',
                        field: 'CreateTime',
                        sortable: true
                    },
                    {
                        title: '操作',
                        field: 'Attribute',
                        width: 120,
                        align: 'center',
                        valign: 'middle',
                        formatter: this.actionFormatter,
                    }
                ],
                locale: 'zh-CN', //中文支持,
                // onDblClickRow: function (row, $element) {
                //     var id = row.ID;
                //     EditViewById(id);
                // },
            })
            // 等待数据渲染以后才能做怎增增删改查
            this.del()

            // 删除按钮与修改按钮的出现与消失
            this.change()
        };

        // 操作栏的格式化
        actionFormatter (value, row, index) {
            // console.log(value, row, index)
            var id = row.ID;
            var result = "";
            result += `
                <a href='javascript:;' class='btn btn-xs blue' onclick="EditViewById('${id}')" title='编辑'>
                    <span class='glyphicon glyphicon-pencil'></span>
                </a>`

            result += "<a href='javascript:;' class='btn btn-xs red btn_delete' title='删除'><span class='glyphicon glyphicon-remove delBtn2'></span></a>";
            return result;
        };

        // 请求服务数据时所传参数
        queryParams (params) {
            console.log(params)
            var temp = {
                // pageSize: params.limit,
                // pageIndex: params.pageNumber,
                Name: $('#search_name').val(),
                Tel: $('#search_tel').val()
            }
            return temp
        };

        // 增加页面的表单验证
        bootstrapValidator () {
            this.$addForm.bootstrapValidator({
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    LoginName: { // 'input输入框中 name = LoginName'
                        validators: {
                            notEmpty: {
                                message: '登录名不能为空'
                            },
                            stringLength: {
                                min: 5,
                                max: 15,
                                message: '姓名为5-10位'
                            }
                        }
                    },
                    Name: {
                        validators: {
                            notEmpty: {
                                message: '姓名不能为空'
                            },
                            stringLength: {
                                min: 2,
                                max: 10,
                                message: '姓名为2-10位'
                            }
                        }
                    },
                    'RoleID[]': {
                        validators: {
                            notEmpty: {
                                message: '角色至少选择一种'
                            }
                        }
                    },
                    Pwd: {
                        validators: {
                            notEmpty: {
                                message: '密码不能为空'
                            },
                            stringLength: {
                                min: 6,
                                max: 128,
                                message: '密码为6-128位'
                            }
                        }
        
                    },
                    Tel: {
                        validators: {
                            notEmpty: {
                                message: '手机号不能为空'
                            },
                            stringLength: {
                                min: 11,
                                max: 11,
                                message: '手机号必须为11位'
                            },
                            regexp: {
                                regexp: /^1(3|4|5|7|8)\d{9}$/,
                                message: '请填写正确的手机号'
                            }
                        }
                    },
                    Email: {
                        validators: {
                            notEmpty: {
                                message: '邮箱不能为空'
                            },
                            regexp: {
                                regexp: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                                message: '无效的邮箱'
                            }
                        }
                    },
                    Attribute: {
                        validators: {
                            notEmpty: {
                                message: '状态不能为空'
                            }
                        }
                    }
                }
            })
        };

        // 删除按钮事件
        del () {
            $('.bootstrap-table').on('click', '#btn_delete, span', (e) => {
                var e = e || window.event
                e = e.srcElement || e.target
                // 单个删除按钮
                if ($(e).hasClass('delBtn2')) {
                    // console.log($(e).closest('tr').find('input').prop('checked', !this.checked))

                    // 修改状态
                    // $(e).closest('tr').find('input').prop('checked', false)
                    $(e).closest('tr').removeClass('selected')
                    this.checkboxLen()
                    $(e).closest('tr').remove()
                }
        
                // 可多个删除的按钮
                if ($(e).hasClass('delBtn') || $(e).hasClass('delBtn1')) {
                    // 获取勾选的数量
                    // console.log(dataArr)
                    var dataArr = this.$table.bootstrapTable('getSelections')
                    
                    $('.popup_de .show_msg').text('确定要删除该用户吗?')
                    $('.popup_de').addClass('bbox');
        
                    // one只执行一次
                    $('.popup_de .btn_submit').one('click', function () {
        
                        // 遍历勾选中的行数，找到它的id，并传到后台删掉，由于我这里不做后台数据库的操作，也就没有写了
                        var ID = []
                        
                        for (var i = 0; i < dataArr.length; i++) {
                            ID[i] = dataArr[i].ID
                        }
                        // $.get('url', {Id: ID}, (data)=>{})
                        $('.popup_de .show_msg').text('删除成功！')
                        $('.popup_de .btn_cancel').hide() // 隐藏取消按钮
                        
                        $('.popup_de .btn_submit').one('click', () => {
                            $('.popup_de .btn_cancel').show()
                            $('.popup_de').removeClass('bbox')
                            //获取勾选的input.并删除
                            var $checked = $('.bs-checkbox>input').filter   (':checked')

                            $(e).closest('tr').removeClass('selected')
                            this.checkboxLen()
                            $checked.closest('tr').remove();
                        })
        
                    }.bind(this))
                    // 弹出框取消按钮事件
                    $('.popup_de .btn_cancel').click(function () {
                        $('.popup_de').removeClass('bbox');
                    })
                    // 弹出框关闭按钮事件
                    $('.popup_de .popup_close').click(function () {
                        $('.popup_de').removeClass('bbox');
                    })
                }
            })
        };

        // 删除按钮与修改按钮的出现与消失
        change () {
            this.$table.children('tbody').change(() => {
                this.checkboxLen()
            })
        };

        checkboxLen () {
            var dataArrLen = $('#table .selected').length

            if (dataArrLen === 1) {
                $('#btn_edit').css('display', 'block').removeClass('fadeOutRight').addClass('animated fadeInRight');
            } else {
                $('#btn_edit').addClass('fadeOutRight')
                setTimeout( () => {
                    $('#btn_edit').css('display', 'none')
                }, 400)
            }
    
            if (dataArrLen >= 1) {
                $('#btn_delete').css('display', 'block').removeClass('fadeOutRight').addClass('animated fadeInRight')
            } else {
                $('#btn_delete').addClass('fadeOutRight')
                setTimeout( () => {
                    $('#btn_delete  ').css('display', 'none')
                }, 400)
            }
        }
    }

    var tableLise = new TableDemo()

    // 查询按钮事件
    // $('#search_btn').click(function () {
    //     $('#table').bootstrapTable('refresh', {
    //         url: './api/bootstrapTable.php'
    //     });
    // })
})



/* 

url: '/Home/GetDepartment',         //请求后台的URL（*）
method: 'get',                      //请求方式（*）
toolbar: '#toolbar',                //工具按钮用哪个容器
striped: true,                      //是否显示行间隔色
cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
pagination: true,                   //是否显示分页（*）
sortable: false,                     //是否启用排序
sortOrder: "asc",                   //排序方式
queryParams: oTableInit.queryParams,//传递参数（*）
sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
pageNumber:1,                       //初始化加载第一页，默认第一页
pageSize: 10,                       //每页的记录行数（*）
pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
search: true,                       //是否显示表格搜索，此搜索是客户端搜索,不会进服务端
strictSearch: true,
showColumns: true,                  //是否显示所有的列
showRefresh: true,                  //是否显示刷新按钮
minimumCountColumns: 2,             //最少允许的列数
clickToSelect: true,                //是否启用点击选中行
height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
cardView: false,                    //是否显示详细视图
detailView: false,                   //是否显示父子表 

*/

