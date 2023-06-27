const Customer = require("../models/Customer")

const createCustomer = async (req, res) => {
    try {
      // Extrair os dados do corpo da requisição
      const { name, cpf } = req.body;
  
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", req.body)
      // Criar uma nova instância do customer
      const newCustomer = new Customer({
        name,
        cpf
      });
  
      // Salvar o customer no banco de dados
      const savedCustomer = await newCustomer.save();
  
      // Responder com o customer criado
      res.status(201).json(savedCustomer);
    } catch (error) {
      // Em caso de erro, retornar uma resposta de erro
      res.status(500).json({ error: 'Erro ao criar o customer -- ' + error });
      console.log(error);
    }
  };
  
  // Função para atualizar um customer existente
  const updateCustomer = async (req, res) => {
    try {
      // Extrair o ID do customer a ser atualizado
      const { id } = req.params;
  
      // Extrair os novos dados do customer do corpo da requisição
      const { name, cpf } = req.body;
  
      // Procurar o customer pelo ID e atualizar os dados
      const updatedCustomer = await Customer.findByIdAndUpdate(
        id,
        { name, cpf },
        { new: true }
      );
  
      // Verificar se o customer existe
      if (!updatedCustomer) {
        return res.status(404).json({ error: 'Customer não encontrado' });
      }
  
      // Responder com o customer atualizado
      res.json(updatedCustomer);
    } catch (error) {
      // Em caso de erro, retornar uma resposta de erro
      res.status(500).json({ error: 'Erro ao atualizar o customer' });
    }
  };
  
  // Função para deletar um customer existente
  const deleteCustomer = async (req, res) => {
    try {
      // Extrair o ID do customer a ser deletado
      const { id } = req.params;
  
      // Deletar o customer pelo ID
      const deletedCustomer = await Customer.findByIdAndDelete(id);
  
      // Verificar se o customer existe
      if (!deletedCustomer) {
        return res.status(404).json({ error: 'Customer não encontrado' });
      }
  
      // Responder com uma mensagem de sucesso
      res.json({ message: 'Customer deletado com sucesso' });
    } catch (error) {
      // Em caso de erro, retornar uma resposta de erro
      res.status(500).json({ error: 'Erro ao deletar o customer' });
    }
  };
  
  // Exportar as funções do controller
  module.exports = {
    createCustomer,
    updateCustomer,
    deleteCustomer
  };