require 'spec_helper'

describe ProtectedBranches::UpdateService do
  let(:protected_branch) { create(:protected_branch) }
  let(:project) { protected_branch.project }
  let(:user) { project.owner }
  let(:params) { { name: 'new protected branch name' } }

  describe '#execute' do
    subject(:service) { described_class.new(project, user, params) }

    it 'updates a protected branch' do
      result = service.execute(protected_branch)

      expect(result.reload.name).to eq(params[:name])
    end

    context 'without admin_project permissions' do
      let(:user) { create(:user) }

      it "raises error" do
        expect { service.execute(protected_branch) }.to raise_error(Gitlab::Access::AccessDeniedError)
      end
    end
  end
end
