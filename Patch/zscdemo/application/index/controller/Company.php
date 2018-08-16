<?php
// +----------------------------------------------------------------------
// | SentCMS [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.tensent.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: molong <molong@tensent.cn> <http://www.tensent.cn>
// +----------------------------------------------------------------------

namespace app\index\controller;
use app\common\controller\Fornt;
use think\Cookie;
use think\Cache;
use think\Db;
class Company extends Fornt{

	protected $model;//数据模型

	protected $field;//图片遍历

	protected $info;//公司信息

	public function _initialize()
	{
		parent::_initialize();

		$this->model = model('Company');

		$this->field = $this->model->companyList;

		$this->info = $this->model->get(['uid'=>Cookie::get('uid')]);

		$this->assign('info',$this->info);//企业信息

		$account = Cookie::get('account');

		if(preg_match("/^1[34578]\d{9}$/", $account) && $this->url!='index/user/loginout'){
			$this->error('非法操作');
		}
	}
	
	public function companyOrder()
	{
		$type = input('type');

		$title = input('title');

		$where = '';

		$wheres = '';

		if($type==1){
			$where = "a.status=0";
		}else if($type==2){
			$where = "a.endTime>".time()." and a.status=2";
		}else if($type==3){
			$where = "a.status=3";
		}else if($type==4){
			$where = "a.endTime<".time()." and a.status=2";
		}

		if($title){
			$wheres = "a.pid like '%$title%' or a.orderNo like '%$title%'";
		}

		
		$list = Db::table('order a')
		        ->join('product b','a.pid=b.pid')
		        ->join('user c','b.uid=c.uid')
		        ->join('recognizee d','d.rid=a.rid')
		        ->where('c.uid='.$this->uid.'')
		        ->where($where)
				->where($wheres)
		        ->field('d.name as rName,b.name,b.money,a.payTime,a.oid,a.status,a.orderNo')
		        ->paginate(10);

		
		$noPay  = Db::table('order a')
			        ->join('product b','a.pid=b.pid')
			        ->join('user c','b.uid=c.uid')
		        	->join('recognizee d','d.rid=a.rid')
			        ->where('c.uid='.$this->uid.' and a.status=0')
			        ->count();

		$data = [
			'list'=>$list,
			'page'=>$list->render()
		];

		$this->assign($data);
		$this->assign('type',$type);
		$this->assign('noPay',$noPay);

		return $this->fetch('company/company_order');
	}

	/**
	 * 公司资料,信息
	 * @return [type] [description]
	 */
	public function companyInfo()
	{
		return $this->fetch('company/company_info');
	}


	/**
	 * 险种管理
	 */
	public function companyProType()
	{
		$name = input('name');

		if(!empty($name)){
			$list = model('Product')->where('uid',$this->uid)->where('name','like',"%$name%")->paginate(10);

		}else{
			$list = model('Product')->where('uid',$this->uid)->paginate(10);
		}

		//销售数量统计
		$lists = $list->all();

		foreach ($lists as $k => $v) {

			$lists[$k]['salesNum'] = model('Order')->where('pid',$lists[$k]['pid'])->where('status',1)->count();
		}

		$data = [
			'list'=>$lists,
			'page'=>$list->render()
		];

		$this->assign($data);//企业信息

		return $this->fetch('company/company_pro_type');
	}


		public function myWallet()
	{


	    return $this->fetch('company/my_wallet');
	}

	/**
	 * 我的消息
	 * @return [type] [description]
	 */
	public function message()
	{


	    return $this->fetch('company/message');
	}

	/**
	 * 企业注册
	 * @return [type] [description]
	 */
	public function companyReg($email=null,$cCode=null)
	{
		$info = model('user')->where('account',$email)->find();

		if($cCode==1){
			if(empty($info)){
				return $this->jsonErr('邮箱还未注册');
			}
		}else{
			$this->checkVerify($cCode);
			if(!empty($info)){
				return $this->jsonErr('邮箱已经被注册');
			}
		}

		//所有邮箱跳转连接
		$emailAll = [
		    '@yahoo.com'  => 'https://login.yahoo.com/',
		    '@msn.com'    => 'https://login.live.com/',
		    '@hotmail.com'=> 'https://outlook.live.com/owa/',
		    '@live.com'   => 'https://qiye.aliyun.com/',
		    '@qq.com'	  => 'https://mail.qq.com/',
		    '@163.com'    => 'http://reg.163.com/',
		    '@163.net'    => 'http://mail.tom.com/',
		    '@263.net'    => 'http://mail.263.net/',
		    '@yeah'       => 'https://mail.yeah.net/'
		];

		//邮箱连接对应跳转连接
		$fen = explode("@",$email);

		$fen[1] = "@".$fen[1];

		$emailUrl = $emailAll[$fen[1]];

		//跳转连接加密(发送邮件)
		if ($cCode==1) {
			$skipUrl = ''.config('web_site_url').'/index/user/forgotPassword.html?account='.$email.'&parm='.md5(md5($email."cdzsds"));

			$to   = $email?$email:config('mail_resave_address');//发送邮箱地址
			$body ='请点击连接完成验证,进行修改密码!<br>';
			$body.='<br>'.$skipUrl.'';
		}else{
			$skipUrl = ''.config('web_site_url').'/index/company/companyreg2.html?email='.$email.'&time='.time();

			$get = "?email=".$email."&time=".time();

			// $skipUrl = urlencode($skipUrl);

			$to   = $email?$email:config('mail_resave_address');//发送邮箱地址
			$body ='请在24小时内点击邮件中的链接继续完成注册,过期自动失效!<br>';
			$body.='<br>'.$skipUrl.'';
		}

		$r=send_mail($to,'宙斯盾企业用户注册验证',$body);

		if($r){
			return $this->jsonSuc('发送成功',['email'=>$email,'emailUrl'=>$emailUrl]);
		}else{
			return $this->jsonErr('发送失败',$r);
		}
	}
}
