const personalList = async (req,res,sqlMain,moment,baseUrl) => {
	res.status(200)
	// key_word:搜索内容
	// page：页数
	
	const {key_word} = req.body
	const {page} = req.params
	const limit_count = 20
	if(!page){
		page = 1
	}
	// 查询总条数
	const selectUserCount = await sqlMain.selectTable('COUNT(1)','user','',(key_word?`WHERE nickName LIKE "${key_word.toString()}%"`:''))
	
	if(!selectUserCount){
		res.send({
			code: 400,
			data:null,
			message: "",
		})
		return
	}
	const {'COUNT(1)':total_count} = selectUserCount[0]
	
	if(total_count&&total_count > 0){
		const current_page = page //当前页数
		const total_page = Math.ceil(total_count/limit_count) //总页数
		// 查询数据
		const limtTeam = ((page-1)*limit_count)+','+((page-1)*limit_count+limit_count)
		const selectUserData = await sqlMain.selectTable(
		'id,nickName,avatar,account,user_type,user.create_time','user',(key_word?`WHERE nickName LIKE "${key_word.toString()}%"`:''),'order by user.id desc limit '+limtTeam
		)
		
		if(!selectUserData){
			res.send({
				code: 400,
				data:null,
				message: "",
			})
			return
		}
		selectUserData.map((res)=>{
			res.create_time = moment(res.create_time).format("YYYY-MM-DD HH:mm:ss")
			res.avatar = res.avatar?baseUrl+'avatar/'+res.avatar:res.avatar
		})
		res.send({
			code: 200,
			data:{
				current_page:Number(current_page),
				total_count:total_count,
				total_page:total_page,
				userData:selectUserData
			},
			message: "",
		})
	}else{
		res.send({
			code: 200,
			data:{
				userData:[]
			},
			message: "",
		})
	}
	
	
	

}
module.exports = personalList
