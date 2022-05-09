const articleRelease = async (req, res,sqlMain,moment,selectUser) => {
	res.status(200)
	// article_id 修改
	// image_name:图片名称
	// title：标题
	// priview_address：预览地址
	// code_address：源码地址
	// content:描述
	// public_status 是否发布 0 不发布，1 发布
	// article_type 文章类型
	
	const {image_name,title,priview_address,code_address,content,public_status,article_id,article_type} = req.body
	if (!title) {
		res.json({
			code: 400,
			message: "请输入标题",
		})
	} else {
			const {id,nickName,avatar} = await selectUser(req,res,sqlMain)
			
			const create_time = moment().format("YYYY-MM-DD HH:mm:ss")
			let insetArticleData = null
			if(article_id){
				insetArticleData = await sqlMain.updateSql('community',
				'title = ?,image_path = ?,create_time = ?,priview_address = ?,code_address = ?,content = ?,public_status = ?,article_type = ?',
				'id',[title,image_name,create_time,priview_address,code_address,content,public_status,article_type,article_id])
				
			}else{
				insetArticleData = await sqlMain.insetSql('community',
				'title,image_path,create_time,priview_address,code_address,content,public_status,article_type,user_id',
				[title,image_name,create_time,priview_address,code_address,content,public_status,article_type,id])
			}
			
			
			if(insetArticleData&&insetArticleData.insertId||insetArticleData.changedRows){
				
				res.send({
					code: 200,
					message: article_id?"修改成功":"发布成功",
				})
			}else{
				res.send({
					code: 400,
					message: article_id?"修改失败":"发布成功",
				})
			}
			
		
	}


}
module.exports = articleRelease
