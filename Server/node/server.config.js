module.exports = {
	apps: [
		{
			name: "FinTech Backend",
			script: "./src/Server.js",
			interpreter: "./node_modules/@babel/node/bin/babel-node.js",
			watch: false,
			// instances: "max",
			// exec_mode: "cluster",
			error_file: "./logs/err.log",
			out_file: "./logs/out.log",
			log_file: "./logs/combined.log",
			time: true,
			env: {
				NODE_ENV: "production",
				PORT: "5555"
			}
		}
	]
};
